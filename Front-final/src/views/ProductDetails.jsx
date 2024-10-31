import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import { useCart } from "../views/CartContext"

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const { addToCart } = useCart()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/productos/${id}`);
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('No se pudo cargar los detalles del producto.');
            }
        };

        fetchProduct();
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!product) return <p>Loading...</p>;

    const handleAddToCart = (product) => {
        addToCart(product);
        alert(`${product.nombre} ha sido agregado al carrito.`);
    };

    return (
        <Container className="my-5 d-flex justify-content-center">
            <Card className="shadow" style={{ maxWidth: '500px', width: '100%' }}>
                <Card.Img variant="top" src={product.image_url} alt={product.nombre} />
                <Card.Body>
                    <Card.Title className="text-center">{product.nombre}</Card.Title>
                    <Card.Text>
                        <strong>Descripción:</strong> {product.descripcion}
                    </Card.Text>
                    <Card.Text>
                        <strong>Precio:</strong> ${product.precio}
                    </Card.Text>
                    <div className="text-center">
                        <Button 
                            variant="primary"
                            onClick={() => handleAddToCart(product)}
                        >
                            Agregar al carrito
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductDetails;