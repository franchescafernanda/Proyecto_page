import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id_productos);
            if (existingProduct) {
                // Si el producto ya existe, solo incrementa la cantidad
                return prevCart.map(item =>
                    item.id === product.id_productos
                        ? { ...item, quantity: item.quantity + product.quantity } // Usa la cantidad del producto
                        : item
                );
            }
            // Si el producto no existe, agrega el nuevo producto al carrito
            return [...prevCart, { 
                id: product.id_productos, // Asegura de que el ID este bien
                name: product.nombre, // Asegura de que el nombre sea correcto
                description: product.descripcion, // Asegura de que la descripción sea correcta
                price: product.precio, // Asegura de que el precio sea correcto
                image_url: product.image_url, // Asegura de que la URL de la imagen sea correcta
                quantity: product.quantity // Usa la cantidad proporcionada
            }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === productId);
            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    // Si hay más de una unidad, solo disminuye la cantidad
                    return prevCart.map(item =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                } else {
                    // Si es la última unidad, elimina el producto del carrito
                    return prevCart.filter(item => item.id !== productId);
                }
            }
            return prevCart;
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) => {
            return prevCart.map(item =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            );
        });
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Nueva función para verificar si un producto ya está en el carrito
    const isProductInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, isProductInCart }}>
            {children}
        </CartContext.Provider>
    );
};