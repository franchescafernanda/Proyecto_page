import axios from 'axios';

const api = axios.create({
  baseURL: "https://front-proyectofinal-5o94.onrender.com", //URL del backend
});

export default api;
