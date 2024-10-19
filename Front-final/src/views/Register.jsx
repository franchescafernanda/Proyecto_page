import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { register } = useContext(AuthContext);
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
      await register(form);
      navigate("/");
    } catch (error) {
      setError("El registro falló, por favor intente nuevamente.");
    }
  };

  return (
    <Container className="register">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center">REGISTRARSE</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ingrese su nombre"
                required
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="formLastName">
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Ingrese su apellido"
                required
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="formEmail">
              <Form.Label>Correo electrónico:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Ingrese su correo electrónico"
                required
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Ingrese su contraseña"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
