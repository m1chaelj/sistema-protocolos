import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8082";
import "../../recursos/estilos/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../recursos/imagenes/logoESCOM.png";

function RecepcionEvaluaciones() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Controla si se muestran las evaluaciones
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/inicio");
  };

  const irADistribucionAcademias = () => {
    navigate("/secretario/distribucion-academias");
  };

  const fetchEvaluaciones = async () => {
    setIsLoading(true);
    setIsVisible(false); // Ocultar la tabla antes de cargar nuevos datos
    try {
      const response = await api.get("/secretario/vista-recepcion-evaluaciones");
      if (response.data && response.data.length > 0) {
        setEvaluaciones(response.data);
        setTimeout(() => setIsVisible(true), 500); // Mostrar tabla después de la animación
      } else {
        alert("No se encontraron evaluaciones.");
      }
    } catch (error) {
      console.error("Error al obtener las evaluaciones:", error);
      alert("Error al cargar los datos. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const badgeStyle = (estado) => ({
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: "10px",
    fontSize: "0.9rem",
    fontWeight: "bold",
    backgroundColor: estado === "APROBADO" ? "#28a745" : "#dc3545",
    color: "#fff",
  });

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

      {/* Botón para regresar a Distribución de Academias */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px", // Posicionado en la esquina superior derecha
          color: "#FFFFFF",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "color 0.3s, text-shadow 0.3s",
        }}
        onClick={irADistribucionAcademias}
        onMouseEnter={(e) => {
          e.target.style.color = "#007BFF";
          e.target.style.textShadow = "0 0 10px #FFD700";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#FFFFFF";
          e.target.style.textShadow = "none";
        }}
      >
        Distribución a Academias
      </div>

      {/* Contenido principal */}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card shadow-lg p-4" style={{ width: "90%", maxWidth: "1200px" }}>
          <div className="card-body">
            <h1 className="text-center mb-4">Recepción de Evaluaciones</h1>
            <button className="btn btn-primary mb-4" onClick={fetchEvaluaciones}>
              Mostrar Protocolos
            </button>
            {isLoading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : (
              isVisible && (
                <div
                  className={`table-responsive fade-in`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    animationDuration: "1.5s",
                    transition: "opacity 1.5s ease-in-out",
                  }}
                >
                  <table className="table table-bordered table-hover text-center">
                    <thead className="table-primary">
                      <tr>
                        <th>Estudiante Principal</th>
                        <th>Directores</th>
                        <th>Título</th>
                        <th>Evaluaciones</th>
                        <th>Academia</th>
                        <th>Sinodales</th>
                        <th>N° Registro del TT</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evaluaciones.map((evaluacion, index) => (
                        <tr key={index}>
                          <td>{evaluacion.nombreEstudiante}</td>
                          <td>
                            {evaluacion.primerDirector}
                            <br />
                            {evaluacion.segundoDirector}
                          </td>
                          <td>{evaluacion.tituloProtocolo}</td>
                          <td>
                            {evaluacion.evaluaciones.map((estado, i) => (
                              <div key={i} style={badgeStyle(estado)}>
                                {estado}
                              </div>
                            ))}
                          </td>
                          <td>{evaluacion.academia}</td>
                          <td>
                            {evaluacion.sinodales.map((sinodal, i) => (
                              <div key={i}>{sinodal}</div>
                            ))}
                          </td>
                          <td>{evaluacion.numeroRegistro}</td>
                          <td>
                            <button className="btn btn-secondary">Regresar al alumno</button>
                          </td>
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

export default RecepcionEvaluaciones;
