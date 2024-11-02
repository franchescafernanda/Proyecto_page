import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../views/CartContext";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({}); // Estado para las cantidades
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/productos');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setProducts(data);
                // Inicia las cantidades en 0 para cada producto
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
        if (productId) {
            navigate(`/productDetails/${productId}`);
        } else {
            console.error('Product ID is undefined');
        }
    };

    const handleAddToCart = (product) => {
        const quantity = quantities[product.id_productos];
        if (quantity > 0) {
            addToCart({ ...product, quantity }); // Agrega la cantidad al producto
            alert(`${product.nombre} ha sido agregado al carrito.`);
            setQuantities({ ...quantities, [product.id_productos]: 0 }); // Reinicia la cantidad después de agregar
        } else {
            alert('Por favor, selecciona una cantidad mayor a 0.');
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
                [productId]: newQuantity < 0 ? 0 : newQuantity, // No permitir - cantidad de las que existen
            };
        });
    };

    return (
        <Container className="cards">
            <Row>
                {products.map((product) => (
                    <Col key={product.id_productos} sm={12} md={6} lg={4}>
                        <Card className="mb-4">
                            <Card.Img
                                className="photo"
                                variant="top"
                                src={product.image_url}
                                alt={product.nombre}
                            />
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