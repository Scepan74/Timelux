("use strict");
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  // Create a new order from the cart data
  async create(ctx) {
    // @ts-ignore
    const { cart } = ctx.request.body;
    try {
      // Get the line items for the order
      const lineItems = await Promise.all(
        cart.map(async (product) => {
          // Get the watch data from the database
          const item = await strapi
            .service("api::watch.watch")
            .findOne(product.id);

          return {
            // The price data for the line item
            price_data: {
              currency: "usd",
              // The product data
              product_data: {
                name: item.brand + " " + item.model,
              },
              // The price of the item in cents
              unit_amount: Math.round(item.price * 100),
            },
            // The quantity of the item
            quantity: product.amount,
          };
        })
      );

      // Create a new Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        // Request shipping address from the customer
        // shipping_address_collection: { allowed_countries: ["US", "CA"] },
        // The payment method types
        payment_method_types: ["card"],
        // The mode of the session
        mode: "payment",
        // The successful redirect URL
        success_url: "http://localhost:5173/" + "?success=true",
        // The cancel redirect URL
        cancel_url: "http://localhost:5173/" + "?success=false",
        // The line items
        line_items: lineItems,
      });

      // Create a new order in the database
      await strapi.service("api::order.order").create({
        data: {
          // The products in the order
          products: cart,
          // The Stripe ID of the checkout session
          stripeId: session.id,
        },
      });

      // Return the Stripe checkout session
      return { stripeSession: session };
    } catch (error) {
      // Set the status code to 500 if there was an error
      ctx.response.status = 500;
      // Return the error
      return { error };
    }
  },
}));
