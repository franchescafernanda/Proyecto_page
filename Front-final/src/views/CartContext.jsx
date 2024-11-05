import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Cargar el carrito desde localStorage al inicializar el estado
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Guardar el carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id_productos);
            if (existingProduct) {
                // Incrementar la cantidad si el producto ya existe
                return prevCart.map(item =>
                    item.id === product.id_productos
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            }
            // Agregar el nuevo producto al carrito
            return [...prevCart, { 
                id: product.id_productos,
                name: product.nombre,
                description: product.descripcion,
                price: product.precio,
                image_url: product.image_url,
                quantity: product.quantity
            }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === productId);
            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    // Disminuir la cantidad si hay más de uno
                    return prevCart.map(item =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                } else {
                    // Eliminar el producto si es la última unidad
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

    const isProductInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, isProductInCart }}>
            {children}
        </CartContext.Provider>
    );
};