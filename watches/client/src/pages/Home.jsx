import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
//Components
import "../css/Home.css";
import Search from "./../components/Search";
import Carousel from "./../components/Carousel";
import { useGlobalContext } from "../components/Context";
//Images
import watchBox from "../assets/watchesBox.webp";
import breitling from "../assets/breitling.webp";
import omega from "../assets/omega.webp";
import cartier from "../assets/cartier.webp";
import patek from "../assets/patek-philippe.webp";
import panerai from "../assets/panerai.webp";
import limited from "../assets/greubelForsey.webp";
import newArrivals from "../assets/newArrivals.webp";
import comingSoon from "../assets/soon.webp";
import bestSellers from "../assets/bestSellers.webp";
//Logos
import omegaLogo from "../assets/Logos/omega.webp";
import breitlingLogo from "../assets/Logos/breitling.png";
import vacheronLogo from "../assets/Logos/vacheron.webp";
import patekLogo from "../assets/Logos/patek-philippe.webp";
import cartierLogo from "../assets/Logos/cartier.webp";
import dubuisLogo from "../assets/Logos/roger-dubuis.jpg";
import fpjourneLogo from "../assets/Logos/fpjourne.jpg";
import greubelLogo from "../assets/Logos/greubel-forsey.jpg";
import aLangeLogo from "../assets/Logos/aLangeSohne.png";
import iwcLogo from "../assets/Logos/iwc.webp";
import jaquetLogo from "../assets/Logos/jaquet_droz.png";
import audemarsLogo from "../assets/Logos/audemars-piguet.jpg";
import paneraiLogo from "../assets/Logos/panerai.webp";
//Icons
import { CiDeliveryTruck } from "react-icons/ci";
import { CiBadgeDollar } from "react-icons/ci";
import { PiGiftThin } from "react-icons/pi";
import { PiKeyReturnThin } from "react-icons/pi";

//home component
const Home = () => {
  //accessing logo ticker toggle function from context
  const { toggleTicker } = useGlobalContext();
  const tickerRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <section className="section1 wrapper">
        {/* blue whale backgruond animation*/}
        <div className="gradient">
          <div className="frame"></div>
        </div>
        {/* mobile search box */}
        <div className="search-mobile">
          <Search />
        </div>
        <Carousel />

        <div className="brand">
          <p className="brand-text">
            <Link to={"/us"}>
              <span>TimeLux </span>
            </Link>
            is home to the greatest collection of pre-owned luxury watches, all
            certified as authentic and Collector Quality.
          </p>
          <img src={watchBox} alt="watchBox" className="brand-img" />
        </div>
        <div className="service-icons">
          <div className="delivery icon-box">
            <CiDeliveryTruck className="icon" />
            <p>free delivery</p>
          </div>
          <div className="finance icon-box">
            <CiBadgeDollar className="icon" />
            <p>0% interest finance</p>
          </div>
          <div className="return icon-box">
            <PiKeyReturnThin className="icon" />
            <p>30 days return policy</p>
          </div>
          <div className="gift icon-box">
            <PiGiftThin className="icon gift-icon" />
            <p>Gift with purchase</p>
          </div>
        </div>
      </section>
      {/* --------------------------------------------------------section2 */}
      <section className="section2 wrapper">
        <div className="gradient">
          <div className="frame"></div>
        </div>
        {/* banto box grid */}
        <div className="grid-container">
          <div className="grid-item grid-item1">
            <div className="pop-brands">
              <h1>Popular Brands</h1>
              <div className="pop-watch-box">
                <div className="pop-watch">
                  {/* link to dinamic collections page. passing state source value will determine which collection to display */}
                  <Link to="/collections" state={{ source: "Breitling" }}>
                    <img src={breitling} alt="breitling" />
                    <div className="img-label">Breitling</div>
                  </Link>
                </div>

                <div className="pop-watch">
                  <Link to="/collections" state={{ source: "Omega" }}>
                    <img src={omega} alt="omega" />
                    <div className="img-label">Omega</div>
                  </Link>
                </div>

                <div className="pop-watch">
                  <Link to="/collections" state={{ source: "Cartier" }}>
                    <img src={cartier} alt="cartier" />
                    <div className="img-label">Cartier</div>
                  </Link>
                </div>
                <div className="pop-watch">
                  <Link to="/collections" state={{ source: "Patek Philippe" }}>
                    <img src={patek} alt="patek" />
                    <div className="img-label">Patek Philippe</div>
                  </Link>
                </div>
                <div className="pop-watch">
                  <Link to="/collections" state={{ source: "Panerai" }}>
                    <img src={panerai} alt="panerai" />
                    <div className="img-label">Panerai</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-item grid-item2">
            <div className="gents">
              <h1>Gents</h1>
              <Link to="/collections" state={{ source: "gents" }}>
                <span className="btn">collection</span>
              </Link>
            </div>
          </div>
          <div className="grid-item grid-item3">
            <div className="ladies">
              <h1>Ladies</h1>
              <Link to="/collections" state={{ source: "ladies" }}>
                <span className="btn">collection</span>
              </Link>
            </div>
          </div>
          <div className="grid-item grid-item4">
            <div className="item4-img"></div>
          </div>
          <div className="grid-item grid-item5">
            <div className="unisex">
              <h1>Unisex</h1>
              <Link to="/collections" state={{ source: "unisex" }}>
                <span className="btn">collection</span>
              </Link>
            </div>
          </div>
          <div className="grid-item grid-item6">
            <div className="we-own">
              <p>
                We own all our watches.
                <br /> That means that we wouldn't sell a watch
                <br /> that we wouldn't buy ourselves.
              </p>
            </div>
          </div>
          <div className="grid-item grid-item7">
            <div
              className="logo-box"
              ref={tickerRef}
              onClick={() => toggleTicker(tickerRef)}
            >
              {/* maping directly from logos array just because I'm lazy to name array variable */}
              {[
                breitlingLogo,
                paneraiLogo,
                audemarsLogo,
                jaquetLogo,
                iwcLogo,
                aLangeLogo,
                omegaLogo,
                cartierLogo,
                patekLogo,
                vacheronLogo,
                dubuisLogo,
                fpjourneLogo,
                greubelLogo,
              ].map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="src"
                  className="watch-logo"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* -----------------------------------------------------------------section3 */}
      <section className="section3 wrapper">
        <div className="gradient">
          <div className="frame"></div>
        </div>
        <div className="collection-box">
          <div className="collection-img">
            <img src={limited} alt="" loading="lazy" />
          </div>
          <div className="collection-text">
            <h1>Limited Edition</h1>
            <p>
              We are proud to be in possesion of a rare collection of quite
              exquisite time pieces limited in edition and of the very top
              market value. Obsessive engineering and perfectionism resulted in
              impresive pieces of impeccable quality rarely matched by any human
              craft.
            </p>
            <Link to="/collections" state={{ source: "Limited" }}>
              <button type="button" className="btn btn-categories">
                collection
              </button>
            </Link>
          </div>
        </div>
        <div className="collection-box">
          <div className="collection-text">
            <h1>New Arrivals</h1>
            <p>
              These watches are the latest addition to our collection. For you
              who follow up on our recent acquisitions and "coming soon"
              anounsments this is oportunity to purchase desired, sometimes
              rarely traded and hard to get colectors pieces.
            </p>
            <Link to="/collections" state={{ source: "New" }}>
              <button type="button" className="btn btn-categories">
                collection
              </button>
            </Link>
          </div>

          <div className="collection-img right-side">
            <img src={newArrivals} alt="" loading="lazy" />
          </div>
        </div>
        <div className="collection-box">
          <div className="collection-img ">
            <img src={comingSoon} alt="" loading="lazy" />
          </div>
          <div className="collection-text">
            <h1>Coming Soon</h1>
            <p>
              Due to diligent inspection and maintanance service process, we pay
              much atention to declaring our watches 'ready to go' status.
              Meanwhile, we are confident to announce, to our customers, soon
              arrivals of such pieces.
            </p>
            <Link to="/collections" state={{ source: "Coming Soon" }}>
              <button type="button" className="btn btn-categories">
                collection
              </button>
            </Link>
            {/* <button className="btn btn-collection">collection</button>*/}
          </div>
        </div>
        <div className="collection-box">
          <div className="collection-text">
            <h1>Best Sellers</h1>
            <p>
              This collection includes the most popular models and brands traded
              lately. The fashion and popularity are not matter of taste and do
              not represent inferiority of other brands but only a whim of
              public interest and opinions for various reasons.
            </p>
            <Link to="/collections" state={{ source: "Best Seller" }}>
              <button type="button" className="btn btn-categories">
                collection
              </button>
            </Link>
            {/* <button className="btn btn-collection">collection</button> */}
          </div>
          <div className="collection-img right-side">
            <img src={bestSellers} alt="" loading="lazy" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
