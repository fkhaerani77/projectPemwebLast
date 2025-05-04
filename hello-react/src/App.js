import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./pages/Home";
import FishProduct from "./pages/FishProduct";
import Tips from "./pages/Tips";
import Cart from "./pages/Cart";
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter> 
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/product/ikan" element={<FishProduct />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
