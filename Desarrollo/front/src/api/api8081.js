import axios from 'axios';

// Configuración de Axios para el puerto 8081
const api8081 = axios.create({
  baseURL: 'http://localhost:8081', // Cambia la URL si es necesario
});

// Función para realizar solicitudes con JSON
api8081.sendJSON = async (url, jsonData) => {
  try {
    const response = await api8081.post(url, jsonData, {
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido para JSON
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al enviar JSON:', error);
    throw error;
  }
};

// Función para realizar solicitudes con multipart/form-data
api8081.sendFormData = async (url, data) => {
  const formData = new FormData();

  // Añade los datos al FormData (manejo de archivos y datos generales)
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  try {
    const response = await api8081.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Tipo de contenido para form-data
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al enviar FormData:', error);
    throw error;
  }
};

export default api8081;
