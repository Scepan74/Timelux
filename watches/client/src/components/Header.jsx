import React from "react";
import "../css/Header.css";
import "../css/TestModeBadge.css";
import { PiHandbagThin, PiSignOutThin } from "react-icons/pi";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./Context";
import Search from "./Search";
import TestModeBadge from "./TestModeBadge";

//  Header component that renders navigation bar, brand logo, search form, and cart icon.
const Header = () => {
  const { setIsClosed, itemsPerCart } = useGlobalContext();

  // burger icon opens sidebar

  const handleBurgerClick = () => {
    setIsClosed(false);
  };

  return (
    <div className="header">
      {/* burger icon=>sidebar */}
      <div className="burger">
        <CiMenuBurger className="burger-icon" onClick={handleBurgerClick} />
      </div>
      {/* Navigation bar links */}
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all">All Watches</Link>
          </li>
          <li>
            <Link to="/us">Us</Link>
          </li>
        </ul>
      </div>
      {/* Brand logo */}
      <div className="brand-logo">
        <Link to={window.innerWidth <= 769 ? "/" : "/us"}>
          <h1>TimeLux</h1>
        </Link>
      </div>
      <TestModeBadge className="header-badge" />
      {/* Search form */}
      <div className="search-form">
        <Search />
      </div>
      {/* link to cart with item counter  */}
      <div className="cartIcon">
        <Link
          to="/cart"
          style={{
            position: "relative",
          }}
        >
          <PiHandbagThin className="cart-icon" />
          {/* cart items counter */}
          <p className="cart-count">{itemsPerCart}</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
