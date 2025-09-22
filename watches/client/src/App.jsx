import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Us from "./pages/Us";
import All from "./pages/All";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Checkin from "./pages/Checkin";

import Collections from "./pages/Collections";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="all" element={<All />} />
        <Route path="collections" element={<Collections />} />
        <Route path="cart" element={<Cart />} />
        <Route path="us" element={<Us />} />
        <Route path="account" element={<Account />} />
        <Route path="checkin" element={<Checkin />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
