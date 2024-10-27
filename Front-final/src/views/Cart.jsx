import React from 'react';
import { useCart } from '../views/CartContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Cart = () => {
    const { cart, removeFromCart, getTotal } = useCart();

    return (
        <Container>
            <h2>Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
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
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>Descripción: {item.description}</Card.Text>
                                    <Card.Text>Cantidad: {item.quantity}</Card.Text>
                                    <Card.Text>Precio: ${item.price}</Card.Text>
                                    <Card.Text>Total: ${item.price * item.quantity}</Card.Text>
                                    <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                                        Quitar del carrito
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
            <h3>Total del Carrito: ${getTotal()}</h3>
        </Container>
    );
};

export default Cart;