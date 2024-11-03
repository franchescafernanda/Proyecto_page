import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/productos');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                // filtra para que solo se vea favoritos
                const favoriteProducts = data.filter(product => favorites.includes(product.id_productos));
                setProducts(favoriteProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [favorites]);

    const handleDetailsClick = (productId) => {
        navigate(`/productDetails/${productId}`);
    };

    const removeFavorite = (productId) => {
        const updatedFavorites = favorites.filter(id => id !== productId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        alert('Producto eliminado de favoritos.');
    };

    return (
        <Container className="cards">
            <h2>Mis Productos Favoritos</h2>
            <Row>
                {products.length > 0 ? (
                    products.map((product) => (
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
                                        variant="danger"
                                        onClick={() => removeFavorite(product.id_productos)}
                                    >
                                        Quitar de favoritos
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No tienes productos favoritos aún.</p>
                )}
            </Row>
        </Container>
    );
};

export default Favorites;
