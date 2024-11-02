import React from 'react';
import { Container, Form, Button, Row } from 'react-bootstrap';

const Checkout = () => {
    return (
        <Container className='checkout'>
            <h2>Realiza tú pago</h2>
            <Form>
                <Form.Group controlId="formCardHolder">
                    <Form.Label>Nombre del Titular</Form.Label>
                    <Form.Control type="text" placeholder="Nombre del Titular" />
                </Form.Group>
                <Form.Group controlId="formCardNumber">
                    <Form.Label>Número de Tarjeta</Form.Label>
                    <Form.Control type="text" placeholder="Número de Tarjeta" />
                </Form.Group>
                <Row>
                    <Form.Group controlId="formExpirationDate" className="col-md-6">
                        <Form.Label>Fecha de Expiración</Form.Label>
                        <Form.Control type="text" placeholder="MM/AA" />
                    </Form.Group>
                    <Form.Group controlId="formCVV" className="col-md-6">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control type="text" placeholder="CVV" />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Pagar
                </Button>
            </Form>
        </Container>
    );
}

export default Checkout;
