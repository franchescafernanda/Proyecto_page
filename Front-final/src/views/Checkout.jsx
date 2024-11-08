// src/views/Checkout.js
import React from 'react';
import { useCart } from '../views/CartContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, getTotal } = useCart();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/cart');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <Container>
            <h2 className="text-center">Boucher de Compra</h2>
            {cart.length === 0 ? (
                <p className="text-center">No hay productos en el carrito.</p>
            ) : (
                <>
                    <Row>
                        {cart.map((item) => (
                            <Col key={item.id} sm={12} md={6} lg={4}>
                                <Card className="mb-4 checkout-card">
                                    <Card.Img
                                        variant="top"
                                        src={item.image_url}
                                        alt={item.name}
                                    />
                                    <Card.Body className="checkout-card-body">
                                        <Card.Title className="text-center">{item.name}</Card.Title>
                                        <Card.Text className="text-center">Cantidad: {item.quantity}</Card.Text>
                                        <Card.Text className="text-center">Precio: ${item.price}</Card.Text>
                                        <Card.Text className="text-center">Subtotal: ${item.price * item.quantity}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <h5 className="text-center">Total de la Compra: ${getTotal()}</h5>
                    <div className="text-center mt-4">
                        <Button variant="primary" onClick={handleGoBack} className="me-2">
                            Volver al Carrito
                        </Button>
                        <Button variant="success" onClick={handlePrint}>
                            Imprimir Boucher
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
};

export default Checkout;
