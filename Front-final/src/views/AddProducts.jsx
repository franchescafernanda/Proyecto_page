import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            if (!response.ok) throw new Error('Error al crear el producto');
            navigate('/products'); // Redirigir a la lista de productos
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container className="add-product-container"> {/* Clase para centrar */}
            <h1>Agregar Producto</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Descripción:</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPrice">
                    <Form.Label>Precio:</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formImageUrl">
                    <Form.Label>URL de la imagen:</Form.Label>
                    <Form.Control
                        type="text"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Añadir producto
                </Button>
            </Form>
        </Container>
    );
};

export default AddProduct;