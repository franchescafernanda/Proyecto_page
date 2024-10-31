import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const AddProducts = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('http://localhost:3000/api/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, precio, descripcion, image_url: imageUrl }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }

            const data = await response.json();
            setSuccess(`Producto agregado: ${data.nombre}`);
            setNombre('');
            setPrecio('');
            setDescripcion('');
            setImageUrl('');
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            setError(error.message);
        }
    };

    return (
        <Container className="my-5">
            <h2 className="text-center">Agregar Producto</h2>
            <Form onSubmit={handleSubmit} className="w-50 mx-auto"> {/* Clases de Bootstrap */}
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre del producto"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPrecio">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Precio del producto"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDescripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Descripción del producto"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formImageUrl">
                    <Form.Label>URL de la Imagen</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="URL de la imagen del producto"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Agregar Producto
                </Button>
            </Form>
        </Container>
    );
};

export default AddProducts;