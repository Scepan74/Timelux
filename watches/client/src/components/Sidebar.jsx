import React, { useEffect, useState } from "react";
import "../css/Sidebar.css";
import { CiMenuBurger } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import RangeSlider from "./RangeSlider";
import { useGlobalContext } from "./Context";
import { Link, NavLink } from "react-router-dom";

//  Sidebar component contains a form for filtering watches by sex, movement, brand and a price range and progression filter. Button applies  the filters and navigates to the collections page with the filtered results

const Sidebar = () => {
  const {
    watches,
    setResults,
    isClosed,
    setIsClosed,
    rangeValue,
    filters,
    setFilters,
    allBrands,
  } = useGlobalContext();

  // sidebar visibility
  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  // function handles changes to the form - updates the filters state based on the target element
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "brand") {
      const updatedBrands = checked
        ? [...filters.brands, value]
        : filters.brands.filter((brand) => brand !== value);
      setFilters((prevFilters) => ({
        ...prevFilters,
        brands: updatedBrands,
      }));
    } else if (type === "radio" || type === "select-one") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  return (
    // ---------------sidebar display--------------------------------
    <div
      className="sidebar"
      style={{
        display: isClosed ? "none" : "block",
      }}
    >
      {/* ---------------animated button-------------------------- */}
      <div className="animated-button">
        <CiMenuBurger className="burger-icon-anim" />
        <TfiClose className="close-btn" onClick={() => setIsClosed(true)} />
      </div>
      {/* -------------------- form -------------------------- */}
      <form className="categories" onChange={handleChange}>
        <h4>categories</h4>
        <br />

        {/* ----- all watches button -----------------------*/}
        <NavLink
          to="/all"
          style={{
            border: "1px solid aquamarine",
            borderRadius: "5px",
            padding: "0.2rem 0.5rem",
          }}
          onClick={toggleSidebar}
        >
          All Watches
        </NavLink>
        <br />
        <br />
        {/* ----- sex checkbox -----------------------*/}
        <div className="category sex-category">
          <h5>Sex:</h5>
          <label>
            <input type="radio" name="gender" value="gents" defaultChecked />{" "}
            Gents
          </label>
          <label>
            <input type="radio" name="gender" value="ladies" /> Ladies
          </label>
          <label>
            <input type="radio" name="gender" value="unisex" /> Unisex
          </label>
        </div>
        <br />
        {/* -------------- movement checkbox -------------------------- */}
        <div className="category movement-category">
          <h5>Movement:</h5>
          <label>
            <input
              type="radio"
              name="movement"
              value="automatic"
              defaultChecked
            />{" "}
            Automatic
          </label>
          <label>
            <input type="radio" name="movement" value="manual" /> Manual
          </label>
          <label>
            <input type="radio" name="movement" value="quartz" /> Quartz
          </label>
        </div>
        <br />
        {/* ------------------ brand checkbox------------------------ */}
        <div className="brand-category">
          <h5>Brand:</h5>
          <div className="brand-list category">
            {allBrands.map((brand, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name="brand"
                  value={brand}
                  defaultChecked
                />{" "}
                {brand}
              </label>
            ))}
          </div>
        </div>
        <br />
        {/* ---------------price filter---------------- */}
        <h5>Price Filter:</h5>
        <RangeSlider />
        <br />
        {/* --------------------direction------------------------ */}
        <label htmlFor="direction">Price Progression: </label>
        <select id="direction" name="direction">
          <option value="increasing"> Increasing</option>
          <option value="decreasing"> Decreasing</option>
        </select>
        <br />

        {/* btn applies filters navigating to selected collections and toggles sidebar*/}
        <div className="apply-btn-container" onClick={toggleSidebar}>
          <Link
            to="/collections"
            state={{ source: "filter", filters }}
            className="btn apply-btn"
          >
            Apply Filters
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
