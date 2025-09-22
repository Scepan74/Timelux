import React, { useEffect, useRef, useState } from "react";
import "../css/Search.css";
import { useGlobalContext } from "./Context";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

// search component that renders a search form and returns a list of watches that match the search query.
const Search = () => {
  const { watches, setResults, results, query, setQuery } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  // refference to the search button that is link to the results display
  const linkedRef = useRef(null);

  //handles the changes in the search bar on submit. Clicking button, refers to the link to results display
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery("");
    linkedRef.current.click();
  };

  useEffect(() => {
    // if the query is not empty, filter the watches and set the results state
    if (query !== "") {
      setLoading(true);
      // filter the watches by going through each watch's properties
      // and check if any of the values contains the query
      const filteredResults = watches.filter((watch) => {
        // get all the values of the watch object
        const values = Object.entries(watch)
          // excluding the description property
          .filter(([key]) => key !== "description")
          // map over the values/properties
          // and check if the value is an array or a string
          .map(([_, value]) =>
            // if the value is a string, return the lowercase version of the string
            typeof value === "string"
              ? value.toLowerCase().trim()
              : // if the value is an array, map over it and return an array of lowercase strings
              Array.isArray(value)
              ? value.map((item) =>
                  typeof item === "string" ? item.toLowerCase().trim() : item
                )
              : // if the value is neither an array nor a string, return an empty string
                ""
          );
        // returns query matching values
        return (
          values
            // flatten the array of arrays into a single array,
            .flat()
            // check if any of the values contains the lowercase query trimed of whitespaces - metching the query
            .some((value) =>
              typeof value === "string"
                ? value === query.toLowerCase().trim()
                : false
            )
        );
      });

      // set the results state
      setResults(filteredResults);

      // set loading to false
      setLoading(false);
    }
  }, [query]);

  return (
    // search form triggering setQuery onChange of value - query as typed
    <div className="search">
      <form className="searchbar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* search button that is link to the results display */}
        <button className="search-btn" type="submit" onClick={handleSubmit}>
          <Link
            to="/collections"
            state={{ source: "search", query }}
            ref={linkedRef}
          >
            <CiSearch className="search-icon" />
          </Link>
        </button>
      </form>
    </div>
  );
};

export default Search;
