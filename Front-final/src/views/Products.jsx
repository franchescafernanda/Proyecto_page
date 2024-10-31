import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../views/CartContext";

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/productos');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                /* console.log(data); */
                setProducts(data);
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
        addToCart(product);
        alert(`${product.nombre} ha sido agregado al carrito.`);
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
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Products;