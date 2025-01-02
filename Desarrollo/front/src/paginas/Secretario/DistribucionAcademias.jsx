import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8082";
import "../../recursos/estilos/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../recursos/imagenes/logoESCOM.png";

function DistribucionProtocolos() {
  const [protocolos, setProtocolos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Controla si se muestran los protocolos
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/inicio");
  };

  const irARecepcionEvaluaciones = () => {
    navigate("/secretario/recepcion-evaluaciones");
  };

  const fetchProtocolos = async () => {
    setIsLoading(true);
    setIsVisible(false); // Ocultar la tabla antes de cargar nuevos datos
    try {
      const response = await api.get("/secretario/vista-distribucion-protocolos");
      if (response.data && response.data.length > 0) {
        setProtocolos(response.data);
        setTimeout(() => setIsVisible(true), 500); // Mostrar tabla después de la animación
      } else {
        alert("No se encontraron protocolos.");
      }
    } catch (error) {
      console.error("Error al obtener los protocolos:", error);
      alert("Error al cargar los datos. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="body-background">
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

      {/* Botón de navegación a Recepción de Evaluaciones */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px", // Posicionado a la derecha
          color: "#FFFFFF",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "color 0.3s, text-shadow 0.3s",
        }}
        onClick={irARecepcionEvaluaciones}
        onMouseEnter={(e) => {
          e.target.style.color = "#007BFF";
          e.target.style.textShadow = "0 0 10px #FFD700";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#FFFFFF";
          e.target.style.textShadow = "none";
        }}
      >
        Recepción de Evaluaciones
      </div>

      {/* Contenido principal */}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card shadow-lg p-4" style={{ width: "90%", maxWidth: "1200px" }}>
          <div className="card-body">
            <h1 className="text-center mb-4">Distribución a Academias</h1>
            <button className="btn btn-primary mb-4" onClick={fetchProtocolos}>
              Mostrar Protocolos
            </button>
            {isLoading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : (
              isVisible && ( // Mostrar la tabla solo si `isVisible` es true
                <div
                  className={`table-responsive fade-in`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    animationDuration: "1.5s", // Ajuste de duración
                    transition: "opacity 1.5s ease-in-out", // Más lento
                  }}
                >
                  <table className="table table-bordered table-hover text-center">
                    <thead className="table-primary">
                      <tr>
                        <th>Estudiante Principal</th>
                        <th>Directores</th>
                        <th>Título del Protocolo</th>
                        <th>N° Registro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {protocolos.map((protocolo, index) => (
                        <tr key={index}>
                          <td>{protocolo.nombreEstudiante}</td>
                          <td>
                            {protocolo.primerDirector}
                            <br />
                            {protocolo.segundoDirector}
                          </td>
                          <td>{protocolo.tituloProtocolo}</td>
                          <td>{protocolo.registro}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="text-center mt-4">
        <img
          src={logo}
          alt="Logo ESCOM"
          style={{
            width: "200px",
          }}
        />
      </div>
    </div>
  );
}

export default DistribucionProtocolos;
