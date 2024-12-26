// Importa Axios
import axios from 'axios';

// Configuración de Axios
const api = axios.create({
  baseURL: 'http://172.17.0.1:8080', // URL de tu backend
  timeout: 10000, // Tiempo máximo para una solicitud
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exportación por defecto
export default api;
