import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/configAxios.jsx";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      // agregar el coso para recorrer la base de datos
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(user);
    navigate("/");
  };

  const register = async (form) => {
    const response = await api.post("/auth/register", form);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(user);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
