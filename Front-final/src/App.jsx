import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarPlantiv from "./components/Navbar.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Products from "./views/Products.jsx";
import NotFound from './views/NotFound';
import Footer from './views/Footer.jsx';
import ProductDetails from "./views/ProductDetails.jsx";
import Profile from "./views/Profile.jsx";
import Orders from "./views/Orders.jsx";
import { CartProvider } from './views/CartContext.jsx';
import "./App.css";

const App = () => {
  return (
    <CartProvider>
      <div>
        <NavbarPlantiv />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
