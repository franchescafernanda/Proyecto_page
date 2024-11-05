import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../views/CartContext";
import { useAuth } from "../context/AuthContext";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth(); // Obtén información del usuario

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/productos');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setProducts(data);
                const initialQuantities = {};
                data.forEach(product => {
                    initialQuantities[product.id_productos] = 0;
                });
                setQuantities(initialQuantities);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDetailsClick = (productId) => {
        navigate(`/productDetails/${productId}`);
    };

    const handleAddToCart = (product) => {
        if (!user) {
            alert('Por favor, inicia sesión para agregar productos al carrito.');
            navigate('/login');
            return;
        }

        const quantity = quantities[product.id_productos];
        if (quantity > 0) {
            addToCart({ ...product, quantity });
            alert(`${product.nombre} ha sido agregado al carrito.`);
            setQuantities({ ...quantities, [product.id_productos]: 0 });
        } else {
            alert('Por favor, selecciona una cantidad mayor a 0.');
        }
    };

    const addFavorite = (productId) => {
        if (!user) {
            alert('Por favor, inicia sesión para agregar a favoritos.');
            navigate('/login');
            return;
        }

        if (!favorites.includes(productId)) {
            const updatedFavorites = [...favorites, productId];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            alert('Producto agregado a favoritos.');
        } else {
            alert('Este producto ya está en tus favoritos.');
        }
    };

    const increaseQuantity = (productId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: prevQuantities[productId] + 1,
        }));
    };

    const decreaseQuantity = (productId) => {
        setQuantities((prevQuantities) => {
            const newQuantity = prevQuantities[productId] - 1;
            return {
                ...prevQuantities,
                [productId]: newQuantity < 0 ? 0 : newQuantity,
            };
        });
    };

    return (
        <Container className="cards">
            <Row>
                {products.map((product) => (
                    <Col key={product.id_productos} sm={12} md={6} lg={4}>
                        <Card className="mb-4" style={{ position: 'relative' }}>
                            <Card.Img
                                className="photo"
                                variant="top"
                                src={product.image_url}
                                alt={product.nombre}
                            />
                            <Button
                                className="favorite-button"
                                variant="outline-danger"
                                onClick={() => addFavorite(product.id_productos)}
                            >
                                ♡ {/* Cambiar texto por un corazón */}
                            </Button>
                            <Card.Body>
                                <Card.Title>{product.nombre}</Card.Title>
                                <Card.Text>{product.descripcion}</Card.Text>
                                <Card.Text>${product.precio}</Card.Text>
                                <div className="quantity-controls">
                                    <Button variant="secondary" onClick={() => decreaseQuantity(product.id_productos)}>-</Button>
                                    <span>{quantities[product.id_productos]}</span>
                                    <Button variant="secondary" onClick={() => increaseQuantity(product.id_productos)}>+</Button>
                                </div>
                                <div className="button-container">
                                    <Button
                                        className="buttonDetails"
                                        onClick={() => handleDetailsClick(product.id_productos)}
                                    >
                                        Ver más
                                    </Button>
                                    <Button 
                                        variant="primary"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Agregar al carrito
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Products;
