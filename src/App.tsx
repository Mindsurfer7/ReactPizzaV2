import React, { useState } from "react";
import "./App.css";
//@ts-ignore
import Header from "./components/Header.tsx";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
//@ts-ignore
import Home from "./components/pages/Home.tsx";
//@ts-ignore
import Cart from "./components/pages/Cart.tsx";
//@ts-ignore
import SinglePizza from "./components/pages/SinglePizza.tsx";

//const AppContext = React.createContext();

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:ID" element={<SinglePizza />} />
      </Routes>
    </div>
  );
}
//grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
export default App;
