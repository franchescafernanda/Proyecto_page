import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/configAxios'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        if (token) {
            const fetchUserData = async () => {
                try {
                    const response = await api.get('/auth/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error al obtener los datos del usuario:', error);
                }
            };
            fetchUserData();
        }
    }, [token]);

    const registerUser = async (nombre, apellido, email, password) => {
        try {
            const response = await api.post('/auth/register', {
                nombre,
                apellido,
                email,
                password,
            });
            setUser(response.data.user);
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token); 
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            throw error;
        }
    };

    const loginUser = async (email, password) => {
        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            })
            setUser(response.data.user)
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
            throw error
        }
    }

    const logoutUser = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, token, registerUser, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthContext }