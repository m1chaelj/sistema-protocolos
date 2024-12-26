import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.17.0.1:8080', // Asegúrate de que la URL sea correcta
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


