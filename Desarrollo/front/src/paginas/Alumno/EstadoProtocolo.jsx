import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081";
import "../../recursos/estilos/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../recursos/imagenes/logoESCOM.png";
import { Modal, Button } from "react-bootstrap";

function EstadoProtocolo() {
  const [nombre, setNombre] = useState(""); // Nombre del protocolo
  const [protocolo, setProtocolo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false); // Mostrar resultados de respuestas
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visibleSections, setVisibleSections] = useState([]); // Manejo de visibilidad por secciones
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/inicio");
  };

  const buscarProtocolo = async () => {
    if (!nombre.trim()) {
      setErrorMessage("Por favor, ingresa el nombre del protocolo.");
      setShowErrorModal(true);
      return;
    }

    setIsLoading(true);
    setShowResults(false); // Oculta resultados antes de buscar
    setVisibleSections([]); // Reinicia las secciones visibles

    try {
      const response = await api.get(`/registro-protocolo/${nombre}`);
      if (response.data && response.data.length > 0) {
        setProtocolo(response.data[0]);
        setTimeout(() => {
          // Mostrar cada sección gradualmente
          setVisibleSections(["directores"]);
          setTimeout(() => setVisibleSections((prev) => [...prev, "integrantes"]), 300);
          setTimeout(() => setVisibleSections((prev) => [...prev, "fechaEntrega"]), 600);
          setTimeout(() => setVisibleSections((prev) => [...prev, "estadoActual"]), 900);
        }, 300);
      } else {
        setErrorMessage("No se encontró el protocolo. Verifica el nombre.");
        setShowErrorModal(true);
        setProtocolo(null);
      }
    } catch (error) {
      console.error("Error al obtener el protocolo:", error);
      setErrorMessage("Error al cargar el protocolo. Intenta de nuevo.");
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const getEstadoStyle = (estado) => {
    if (!estado) return { backgroundColor: "#6c757d", color: "#fff" }; // Gris si no hay estado
    const trimmedEstado = estado.trim().toLowerCase(); // Elimina espacios y convierte a minúsculas
    switch (trimmedEstado) {
      case "aprobado":
        return {
          backgroundColor: "#28a745", // Verde
          color: "#fff",
        };
      case "rechazado":
        return {
          backgroundColor: "#dc3545", // Rojo
          color: "#fff",
        };
      case "en revisión":
        return {
          backgroundColor: "#ffc107", // Amarillo
          color: "#000",
        };
      default:
        return {
          backgroundColor: "#6c757d", // Gris (predeterminado)
          color: "#fff",
        };
    }
  };

  const fadeInStyle = (delay) => ({
    animation: `fadeIn 1s ease-in-out ${delay}s forwards`,
    opacity: 0,
  });

  const textStyle = {
    fontSize: "1.2rem",
    fontFamily: "Arial, sans-serif",
    color: "#000",
    fontWeight: "normal",
    marginBottom: "10px",
  };

  const listItemStyle = {
    fontSize: "1rem",
    fontFamily: "Arial, sans-serif",
    color: "#555",
    lineHeight: "1.5",
  };

  return (
    <div className="body-background" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Botón de cerrar sesión */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "#FFFFFF",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "color 0.3s, text-shadow 0.3s",
        }}
        onClick={cerrarSesion}
        onMouseEnter={(e) => {
          e.target.style.color = "#007BFF";
          e.target.style.textShadow = "0 0 10px #FFD700";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#FFFFFF";
          e.target.style.textShadow = "none";
        }}
      >
        Cerrar sesión
      </div>

      {/* Tarjeta principal con scroll interno */}
      <div
        className="card fade-in shadow-lg p-4"
        style={{
          width: "90%",
          maxWidth: "800px",
          margin: "50px auto",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div className="card-body">
          <h1 className="text-center">Estado del Protocolo</h1>

          {/* Barra de búsqueda */}
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar protocolo por nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{ fontFamily: "Arial, sans-serif", fontSize: "1rem" }}
            />
            <button
              className="btn btn-primary"
              onClick={buscarProtocolo}
              style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
            >
              Buscar
            </button>
          </div>

          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : protocolo ? (
            <div>
              {visibleSections.includes("directores") && (
                <>
                  <h2 style={{ ...textStyle, ...fadeInStyle(0.2) }}>Directores</h2>
                  <ul className="list-group mb-3" style={fadeInStyle(0.4)}>
                    <li className="list-group-item" style={listItemStyle}>
                      {protocolo.primerDirector}
                    </li>
                    <li className="list-group-item" style={listItemStyle}>
                      {protocolo.segundoDirector}
                    </li>
                  </ul>
                </>
              )}

              {visibleSections.includes("integrantes") && (
                <>
                  <h2 style={{ ...textStyle, ...fadeInStyle(0.6) }}>Integrantes</h2>
                  <ul className="list-group mb-3" style={fadeInStyle(0.8)}>
                    <li className="list-group-item" style={listItemStyle}>
                      {protocolo.nombrePrimerIntegrante}
                    </li>
                    <li className="list-group-item" style={listItemStyle}>
                      {protocolo.nombreSegundoIntegrante}
                    </li>
                  </ul>
                </>
              )}

              {visibleSections.includes("fechaEntrega") && (
                <>
                  <h2 style={{ ...textStyle, ...fadeInStyle(1) }}>Fecha de Entrega</h2>
                  <p style={{ ...listItemStyle, ...fadeInStyle(1.2) }}>
                    {new Date(protocolo.fechaEntrega).toLocaleDateString()}
                  </p>
                </>
              )}

              {visibleSections.includes("estadoActual") && (
                <>
                  <h2 style={{ ...textStyle, ...fadeInStyle(1.4) }}>Estado Actual</h2>
                  <p style={fadeInStyle(1.6)}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "5px 15px",
                        borderRadius: "15px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        ...getEstadoStyle(protocolo.estadoProtocolo),
                      }}
                    >
                      {capitalizeFirstLetter(protocolo.estadoProtocolo)}
                    </span>
                  </p>
                </>
              )}

              {/* Botón para mostrar respuestas */}
              <button
                className="btn btn-info w-100 mb-3"
                onClick={() => setShowResults(!showResults)}
                style={{ fontFamily: "Arial, sans-serif", fontSize: "1rem", fontWeight: "bold" }}
                disabled={protocolo.estadoProtocolo?.trim().toLowerCase() === "en revisión"} // Deshabilitar si está en revisión
              >
                {showResults ? "Ocultar Respuestas" : "Mostrar Respuestas"}
              </button>

              {/* Sección de respuestas */}
              {showResults && protocolo.respuestas && (
                <div>
                  <h2 style={{ textStyle }}>Respuestas</h2>
                  <ul className="list-group mb-3">
                    {protocolo.respuestas
                      .split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((respuesta, index) => (
                        <li key={index} className="list-group-item" style={listItemStyle}>
                          {respuesta}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-muted">No hay datos para mostrar.</p>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="text-center mt-4">
        <img
          src={logo}
          alt="Logo ESCOM"
          style={{
            width: "150px",
          }}
        />
      </div>

      {/* Modal de error */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EstadoProtocolo;
