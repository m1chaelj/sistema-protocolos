import axios from "axios";

// Configuración de Axios para el puerto 8081
const api8081 = axios.create({
  baseURL: "http://172.17.0.1:8081", // URL de tu backend
  timeout: 10000, // Tiempo máximo para una solicitud
});

// Función para enviar `multipart/form-data`
api8081.sendFormData = async (url, formData) => {
  try {
    const response = await api8081.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error al enviar FormData:", error);
    throw error;
  }
};

export default api8081;
