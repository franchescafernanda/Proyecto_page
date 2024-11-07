import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarPlantiv from "./components/Navbar";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Products from "./views/Products";
import NotFound from './views/NotFound';
import Footer from './views/Footer';
import ProductDetails from "./views/ProductDetails";
import AddProduct from "./views/AddProducts";
import Profile from "./views/Profile";
//import Orders from "./views/Orders";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import { CartProvider } from './views/CartContext';
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Favorites from "./views/Favorites";

const App = () => {
  return (

        <AuthProvider>
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
                <Route path="/addProducts" element={<AddProduct />} />
                <Route path="/checkout" element={<Checkout/>} />
                {/* <Route path="/orders" element={<Orders />} /> */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
            </CartProvider>
        </AuthProvider>
  );
};

export default App;
