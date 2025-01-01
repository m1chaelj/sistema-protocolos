import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081";
import "../../recursos/estilos/custom.css";
import logo from "../../recursos/imagenes/logoESCOM.png";

function EstadoProtocolo() {
  const [nombre, setNombre] = useState(""); // Nombre del protocolo
  const [protocolo, setProtocolo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const buscarProtocolo = async () => {
    if (!nombre) {
      alert("Por favor, ingresa el nombre del protocolo.");
      return;
    }

    setIsLoading(true); // Mostrar spinner mientras se realiza la solicitud
    try {
      // Hacer la solicitud sin modificar el nombre
      const response = await api.get(`/registro-protocolo/${nombre}`);
      console.log("Respuesta de la API:", response.data);

      if (response.data && response.data.length > 0) {
        setProtocolo(response.data[0]);
      } else {
        alert("No se encontró el protocolo. Verifica el nombre.");
        setProtocolo(null);
      }
    } catch (error) {
      console.error("Error al obtener el protocolo:", error);
      alert("Error al cargar el protocolo. Intenta de nuevo.");
    } finally {
      setIsLoading(false); // Ocultar spinner
    }
  };

  const handleCorreccion = () => {
    navigate("/alumno/correccion-protocolo");
  };

  const handleGenerarPDF = () => {
    alert("Generando PDF...");
  };

  return (
    <div className="body-background">
      {/* Botón de cerrar sesión con efecto hover */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "#FFFFFF",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.color = "#007BFF")}
        onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
        onClick={() => navigate("/inicio")}
      >
        Cerrar sesión
      </div>
      <div className="card">
        <h1>Estado del Protocolo</h1>
        {/* Barra de búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar protocolo por nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <button
            className="btn btn-primary mt-2"
            onClick={buscarProtocolo}
            style={{ width: "100%", fontWeight: "bold" }}
          >
            Buscar
          </button>
        </div>
        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : protocolo ? (
          <>
            <h2>Título del Protocolo</h2>
            <p>{protocolo.nombre}</p>
            <h2>Directores</h2>
            <p>{protocolo.primerDirector}</p>
            <p>{protocolo.segundoDirector}</p>
            <h2>Integrantes</h2>
            <p>{protocolo.nombrePrimerIntegrante}</p>
            <p>{protocolo.nombreSegundoIntegrante}</p>
            <h2>Fecha de Entrega</h2>
            <p>{new Date(protocolo.fechaEntrega).toLocaleDateString()}</p>
            <h2>Estado Actual</h2>
            <p>
              <span
                style={{
                  color:
                    protocolo.estadoProtocolo === "Aprobado"
                      ? "green"
                      : protocolo.estadoProtocolo === "Rechazado"
                      ? "red"
                      : "orange",
                  fontWeight: "bold",
                }}
              >
                {protocolo.estadoProtocolo}
              </span>
            </p>
            {protocolo.estadoProtocolo === "Rechazado" && (
              <button className="btn btn-danger" onClick={handleCorreccion}>
                Corregir Protocolo
              </button>
            )}
            {protocolo.estadoProtocolo === "Aprobado" && (
              <button className="btn btn-success" onClick={handleGenerarPDF}>
                Generar PDF
              </button>
            )}
          </>
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </div>
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: "150px" }} />
    </div>
  );
}

export default EstadoProtocolo;
