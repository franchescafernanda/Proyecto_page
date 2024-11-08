import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { loginUser, user } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccessMessage(null)
        try {
            await loginUser(email, password)
            setSuccessMessage('Usuario logueado con éxito')
            navigate('/')
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
            setError('Error al iniciar sesión, verifica tus credenciales')
        }
    }

return (
    <div className="cont-login">
    <Container className="login">
        <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
            />
            <button type="submit">Iniciar Sesión</button>
        </form>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {error && <div className="alert alert-info">{error}</div>}
        {user && <div>Usuario logueado: {user.nombre} {user.apellido}</div>} 
    </Container>
    </div>
);
};

export default Login;
