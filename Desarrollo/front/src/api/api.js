import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto por la URL de tu API en Docker
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Puedes añadir interceptores si necesitas agregar tokens de autenticación
api.interceptors.request.use(
  (config) => {
    // Modifica el encabezado antes de enviar la solicitud si es necesario
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

