import React, { useEffect } from "react";
import "../css/All.css";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { useGlobalContext } from "../components/Context";

//component renders page displaying all watches in a grid of cards.
const All = () => {
  const { isOpen, setIsOpen, watches, watch, openModal, isLoading } =
    useGlobalContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <section className="all wrapper">
        {/* blue whale background animation */}
        <div className="gradient">
          <div className="frame"></div>
        </div>
        <h1>All Watches</h1>
        {/* container for the cards */}
        <div className="all-cards-container">
          {/* if the data is loading, display a loading message */}
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            /* if the data is loaded, render a card for each watch and pass open modal function as a prop*/
            watches.map((item) => (
              <Card watch={item} key={item.id} modal={() => openModal(item)} />
            ))
          )}
        </div>
      </section>
      {/* rendering modal when isOpen is true */}
      {isOpen ? <Modal /> : null}
    </main>
  );
};

export default All;
