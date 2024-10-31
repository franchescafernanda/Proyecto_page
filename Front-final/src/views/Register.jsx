import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const { registerUser } = useAuth();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await registerUser(nombre, apellido, email, password);
            alert('Usuario creado con éxito')
        } catch (err) {
            setError('Error al registrar el usuario.');
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registrar Usuario</h2>
        {error && <p>{error}</p>}
        <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
        />
        <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
        />
        <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit">Registrar</button>
    </form>
    );
};

export default Register;