import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Cart from "../pages/Cart";

// Layout component that renders a layout consisting of a Header, Sidebar, Footer, and an Outlet to render the main content.

const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
