import React from 'react';
import { useCart } from '../views/CartContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, getTotal } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <Container>
            <h2 className="text-center">Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p className="text-center">El carrito está vacío.</p>
            ) : (
                <>
                    <Row>
                        {cart.map((item) => (
                            <Col key={item.id} sm={12} md={6} lg={4}>
                                <Card className="mb-4 cart-card">
                                    <Card.Img
                                        variant="top"
                                        src={item.image_url}
                                        alt={item.name}
                                    />
                                    <Card.Body className="cart-card-body">
                                        <Card.Title className="text-center">{item.name}</Card.Title>
                                        <Card.Text className="text-center">Descripción: {item.description}</Card.Text>
                                        <Card.Text className="text-center">Cantidad: {item.quantity}</Card.Text>
                                        <Card.Text className="text-center">Precio: ${item.price}</Card.Text>
                                        <Card.Text className="text-center">Total: ${item.price * item.quantity}</Card.Text>
                                        <div className="text-center">
                                            <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                                                Quitar del carrito
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <h5 className="text-center">Total del Carrito: ${getTotal()}</h5>
                    <div className="text-center">
                        <Button variant="primary" onClick={handleCheckout}>
                            Boucher de compra
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
};

export default Cart;