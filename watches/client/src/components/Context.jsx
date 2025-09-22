import React, { useContext, useEffect, useRef, useState } from "react";
//Fetch custom component
import useFetch from "./useFetch";
//carousel banners
import banner1 from "../assets/banner1.webp";
import banner2 from "../assets/banner2.webp";
import banner3 from "../assets/banner3.webp";
import banner4 from "../assets/banner4.webp";
import banner5 from "../assets/banner5.webp";
import banner6 from "../assets/banner6.webp";
import banner7 from "../assets/banner7.webp";
// import Cart from "../pages/Cart";

//url and apiKey variables for readability
const url = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_TOKEN;
//ternary checkup on local storage if any keys present => storage empty or not
const isSigned = Object.keys(localStorage).length > 0 ? true : false;

const AppContext = React.createContext();
//----------------------------------------context provider-------------------------------------------
const AppProvider = ({ children }) => {
  const { rowData, isLoading } = useFetch(url, apiKey);

  //-------------------------------------------state values
  const [watches, setWatches] = useState([]);
  const [watch, setWatch] = useState([]);
  const [cart, setCart] = useState([]);
  const [isClosed, setIsClosed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [rangeValue, setRangeValue] = useState([5000, 1000000]);
  const [isSignedup, setIsSignedup] = useState(isSigned);
  const [showPass, setShowPass] = useState(true);
  const [filters, setFilters] = useState({
    gender: "gents",
    movement: "automatic",
    priceRange: rangeValue,
    direction: "increasing",
  });
  const [itemsPerCart, setItemsPerCart] = useState(0);

  //restructuring data for readability and easyer use
  const restructureData = (rowData) => {
    // maps each item in data and returns array of objects
    return rowData.data?.map((item) => {
      const { id, attributes } = item;
      const { brand, model, description, REF, gender, movement, price } =
        attributes;

      const imageUrls = attributes.images
        ? attributes.images.data.map((image) => image.attributes.url)
        : [];
      const materials = attributes.materials
        ? attributes.materials.data.map((material) => material.attributes.title)
        : [];
      const styles = attributes.styles
        ? attributes.styles.data.map((style) => style.attributes.title)
        : [];
      const categories = attributes.categories
        ? attributes.categories?.data.map(
            (category) => category.attributes.title
          )
        : [];
      // returns object of properties
      return {
        id,
        brand,
        model,
        description,
        REF,
        gender,
        movement,
        price,
        imageUrls,
        materials,
        styles,
        categories,
      };
    });
  };
  //here condition has to have .data for rowData to be sure rowData is timelly and not empty as from async function. otherwise won't work!
  useEffect(() => {
    if (rowData.data) {
      setWatches(restructureData(rowData));
    } else console.log("Loading");
  }, [rowData]);

  // ----------------------------------functions---------------------------------------------

  const allBrands = Array.from(new Set(watches.map((watch) => watch.brand)));
  //setting desired filters
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      brands: allBrands,
      priceRange: rangeValue,
    }));
  }, [rangeValue, watches]);

  const banner = [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6,
    banner7,
  ];
  // logo ticker toggle switch
  const toggleTicker = (tickerRef) => {
    tickerRef.current.style.animationPlayState =
      tickerRef.current.style.animationPlayState === "paused"
        ? "running"
        : "paused";
  };

  //modal data and status
  const openModal = (item) => {
    setWatch({ ...item, amount: 1 });
    setIsOpen(true);
  };

  //check if watch is 'Coming Soon'=> not available
  const addToCart = (watch) => {
    watch.categories.includes("Coming Soon")
      ? alert("Coming Soon!")
      : (setCart([...cart, watch]), setIsOpen(false));
  };

  //set cart array with all items filtered different than argument id=> remove one with argument id
  const remove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  //set empty array => clear
  const clearCart = () => {
    setCart([]);
  };

  //id,type arguments. seting cart with cartitems with matching ids and modifying amount depending on type.So, triggering event pass ids of those (one at the time) to which increase or decrease amount property. Also filter out amount=0 from the cart.
  const toggleAmount = (id, type) => {
    let tempCart = cart
      .map((cartItem) => {
        if (cartItem.id === id) {
          if (type === "inc") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (type === "dec") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return setCart(tempCart);
  };

  // keep track of how many items are in the cart
  useEffect(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.amount, 0);
    setItemsPerCart(totalItems);
  }, [cart]);

  useEffect(() => {
    // Map cart, calculate each item total price, return an array of items totals
    const cartTotal = cart.map((cartItem) => {
      const itemTotal = cartItem.amount * cartItem.price;
      return itemTotal;
    });

    // Initialize a variable to hold the total of all items
    let sum = 0;

    // Loop over the array of itemstotals and add them all up
    cartTotal.forEach((itemTotal) => {
      sum += itemTotal;
    });

    // Round the sum to 2 decimal places and set the total state to the sum
    const allTotal = parseFloat(sum.toFixed(2));

    setTotal(allTotal);
  }, [cart]);

  // ------------------------------references to nods --------------------------------
  const loginRef = useRef(null);
  const signupRef = useRef(null);
  const checkinRef = useRef(null);

  // Center the modal window depending on the state of the `isSignedup` variable. If `isSignedup` is true, the login form is shown, otherwise the signup form is shown.
  const center = () => {
    if (isSignedup === true) {
      // Hide the signup form, show the login form and move it to the center
      console.log("login");
      checkinRef.current.children[2].style.display = "none";
      checkinRef.current.children[1].style.display = "block";
      checkinRef.current.children[0].classList.add("move-right");
      checkinRef.current.children[1].classList.add("move-left");
      // Style the login form
      Object.assign(checkinRef.current.children[1].style, {
        backgroundColor: "hsl(196, 96%, 10%)",
        borderRadius: "1rem",
        zIndex: "2",
      });
    } else if (isSignedup === false) {
      // Hide the login form, show the signup form and move it to the center
      console.log("signup");
      checkinRef.current.children[2].style.display = "none";
      checkinRef.current.children[0].style.display = "block";
      checkinRef.current.children[1].classList.add("move-left");
      checkinRef.current.children[0].classList.add("move-right");

      // Style the signup form
      Object.assign(checkinRef.current.children[0].style, {
        backgroundColor: "hsl(196, 96%, 10%)",
        borderRadius: "1rem",
        zIndex: "2",
      });
    }
  };
  // show and hide password
  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <AppContext.Provider
      value={{
        watches,
        watch,
        isOpen,
        setIsOpen,
        isClosed,
        setIsClosed,
        toggleTicker,
        banner,
        cart,
        addToCart,
        remove,
        clearCart,
        toggleAmount,
        total,
        setTotal,
        rowData,
        isLoading,
        openModal,
        results,
        setResults,
        query,
        setQuery,
        rangeValue,
        setRangeValue,
        filters,
        setFilters,
        allBrands,
        center,
        loginRef,
        signupRef,
        checkinRef,
        showPass,
        toggleShowPass,
        setIsSignedup,
        itemsPerCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export default AppProvider;

//---------------------some alternative code using reducer----------------------------

// const initialState = {
//   loading: false,
//   cart: cartItems,
//   total: 0,
//   amount: 0,
// };

// const clearCart = () => {
//   dispatch({ type: "CLEAR_CART" });
// };
// const remove = (id) => {
//   dispatch({ type: "REMOVE", payload: id });
// };
// const increase = (id) => {
//   dispatch({ type: "INCREASE", payload: id });
// };
// const decrease = (id) => {
//   dispatch({ type: "DECREASE", payload: id });
// };
// const fetchData = async () => {
//   dispatch({ type: "LOADING" });
//   const response = await fetch(url);
//   const cart = await response.json();
//   dispatch({ type: "DISPLAY_ITEMS", payload: cart });
// };
// const toggleAmount = (id, type) => {
//   dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
// };
// useEffect(() => {
//   fetchData();
// }, []);

// useEffect(() => {
//   dispatch({ type: "GET_TOTALS" });
// }, [state.cart]);
