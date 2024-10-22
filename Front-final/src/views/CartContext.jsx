import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                // Si el producto ya existe, solo incrementa la cantidad
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // Si el producto no existe, agrega el nuevo producto al carrito con todos los campos necesarios
            return [...prevCart, { 
                id: product.id_productos, // Asegúrate de que el ID sea correcto
                name: product.nombre, // Asegúrate de que el nombre sea correcto
                description: product.descripcion, // Asegúrate de que la descripción sea correcta
                price: product.precio, // Asegúrate de que el precio sea correcto
                image_url: product.image_url, // Asegúrate de que la URL de la imagen sea correcta
                quantity: 1 // Inicializa la cantidad en 1
            }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
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

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal }}>
            {children}
        </CartContext.Provider>
    );
};
