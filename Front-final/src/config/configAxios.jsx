import axios from 'axios';

const api = axios.create({
  baseURL: "https://localhost:3000/api/", //URL del backend
});

export default api;
