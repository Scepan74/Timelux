import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../components/Context";
import "../css/Collections.css";
import Card from "../components/Card";
import Modal from "../components/Modal";

// Component renders a page with a header and a collection of watches filtered by the source.

const Collections = () => {
  // golobal context and state values
  const { watches, isOpen, openModal, results, setQuery } = useGlobalContext();
  const [collection, setCollection] = useState([]);
  const [isAscend, setIsAscend] = useState(true);

  // sort watches by price using slice and sort methods. slice method creates a copy of the array so that the original array is not modified. Sort method sorts the array in ascending/descending order. Two objects in sort method's argument are compared by price value. Sort method returns a new sorted array so the negative value sets object 'a' before 'b' and positive value sets 'a' after 'b'=> Ascending order. Similarly, 'b' is set before 'a'in Descending order.
  const collectionAscend = collection.slice().sort((a, b) => a.price - b.price);
  const collectionDescend = collection
    .slice()
    .sort((a, b) => b.price - a.price);

  // useLocation hook is passing state from the previous page to here. I've set source state property to flag the source of the selected collection.
  const location = useLocation();
  const { source, query, filters } = location.state;

  useEffect(() => {
    // if source is one of contested category values, watches items will be filtered by categories against the source (The cases when whe have category filters in source), and result collection state will be set to the filtered data.
    if (
      source === "New" ||
      source === "Best Seller" ||
      source === "Coming Soon" ||
      source === "Limited"
    ) {
      const filteredData = watches.filter(
        (item) => item.categories[0] === source
      );
      setCollection(filteredData);
      // if source is one of contested brand values,items will be filtered by brands against the source (The cases when whe have brand filters in source), and result collection state will be set to the filtered data.
    } else if (
      source === "Breitling" ||
      source === "Omega" ||
      source === "Cartier" ||
      source === "Patek Philippe" ||
      source === "Panerai"
    ) {
      const filteredData = watches.filter((item) => item.brand === source);
      setCollection(filteredData);
      //similar for sex
    } else if (
      source === "gents" ||
      source === "ladies" ||
      source === "unisex"
    ) {
      const filteredData = watches.filter((item) => item.gender === source);
      setCollection(filteredData);

      //if source is 'filter', watches items will be filtered by sidebar component selected filters and result collection state will be set to the filtered data.
    } else if (source === "filter") {
      const filteredData = watches.filter((item) => {
        // getting an array of key/value pairs from the filters object and checking if every key/value pair exists in the item object.
        return Object.entries(filters).every(([filterKey, filterValue]) => {
          //  in case of 'brands', returns true if filterValue list contains watch's brand
          if (filterKey === "brands") {
            return filterValue.includes(item.brand);
            // in case of 'priceRange', returns true if item price is within the price range
          } else if (filterKey === "priceRange") {
            const [minPrice, maxPrice] = filterValue;
            return item.price >= minPrice && item.price <= maxPrice;
            //  generic property check covers any other cases with any other filterKey present and it comares the value with the filterValue for true.
          } else if (item.hasOwnProperty(filterKey)) {
            return item[filterKey] === filterValue;
          }

          // in all other cases, returns true, so no excluesion is made
          return true;
        });
      });
      setCollection(filteredData);
      //setting direction state to ascending/descending order
      setIsAscend(filters.direction === "increasing" ? true : false);
      //search sourse is setting query results as collections criteria
    } else if (source === "search") {
      setCollection(results);
    }
  }, [source, results, filters]);

  useEffect(() => {
    window.scrollTo(0, 0); //scrolling to the top of the page on render
  }, []);

  return (
    <main>
      <section className="collections wrapper">
        <div className="gradient">
          <div className="frame"></div>
        </div>
        <h2>
          {/* dinamic title for different sources, query and 'no results' case */}
          {query
            ? results.length === 0
              ? "No results found"
              : `${source}: ${query}`
            : source === "filter"
            ? `${source} rusults`
            : source}
        </h2>
        <div className="card-container">
          {/* rendering cards in ascend/descend order */}
          {isAscend
            ? collection &&
              collectionAscend.map((item) => (
                <Card
                  watch={item}
                  key={item.id}
                  modal={() => openModal(item)}
                />
              ))
            : collection &&
              collectionDescend.map((item) => (
                <Card
                  watch={item}
                  key={item.id}
                  modal={() => openModal(item)}
                />
              ))}
        </div>
        {/* each card on click opens modal */}
        {isOpen ? <Modal /> : null}
      </section>
    </main>
  );
};

export default Collections;
