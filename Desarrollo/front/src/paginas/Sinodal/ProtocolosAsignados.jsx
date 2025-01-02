import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../recursos/estilos/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api/api8082";
import logo from "../../recursos/imagenes/logoESCOM.png";

function ProtocolosAsignados() {
  const [protocolos, setProtocolos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cuestionarioVisible, setCuestionarioVisible] = useState(null); // Protocolo en evaluación
  const [respuestas, setRespuestas] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/inicio");
  };

  const fetchProtocolos = async () => {
    setIsLoading(true);
    setIsVisible(false); // Ocultar la tabla antes de cargar nuevos datos
    try {
      const response = await api.get("/sinodal/protocolos-asignados");
      if (response.data && response.data.length > 0) {
        setProtocolos(response.data);
        setTimeout(() => setIsVisible(true), 500);
      } else {
        alert("No se encontraron protocolos asignados.");
      }
    } catch (error) {
      console.error("Error al obtener los protocolos:", error);
      alert("Error al cargar los datos. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCuestionario = (protocolo) => {
    setCuestionarioVisible(
      cuestionarioVisible === protocolo ? null : protocolo
    );
  };

  const handleRespuesta = (index, value) => {
    setRespuestas((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const guardarCuestionario = async (protocolo) => {
    const evaluacionFinal = Object.values(respuestas).every(
      (resp) => resp === "Si"
    )
      ? "APROBADO"
      : "RECHAZADO";

    const payload = {
      protocoloId: protocolo.id,
      respuestas,
      evaluacionFinal,
    };

    try {
      await api.post("/sinodal/guardar-evaluacion", payload);
      alert("Evaluación guardada correctamente.");
      setCuestionarioVisible(null);
      setRespuestas({});
    } catch (error) {
      console.error("Error al guardar la evaluación:", error);
      alert("Error al guardar la evaluación. Intenta de nuevo.");
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

      {/* Contenido principal */}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card shadow-lg p-4" style={{ width: "90%", maxWidth: "1200px" }}>
          <div className="card-body">
            <h1 className="text-center mb-4">Protocolos Asignados</h1>
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
              isVisible && (
                <div className="table-responsive fade-in">
                  <table className="table table-bordered table-hover text-center">
                    <thead className="table-primary">
                      <tr>
                        <th>Estudiante Principal</th>
                        <th>Director</th>
                        <th>Título</th>
                        <th>Evaluar</th>
                        <th>Evaluación Final</th>
                        <th>N° Registro del TT</th>
                        <th>Acción</th>
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
                          <td>
                            <button
                              className="btn btn-info"
                              onClick={() => toggleCuestionario(protocolo)}
                            >
                              Evaluar
                            </button>
                          </td>
                          <td>
                            {cuestionarioVisible === protocolo && (
                              <div className="mt-3">
                                {[
                                  "¿El título corresponde al producto esperado?",
                                  "¿El resumen expresa claramente la propuesta de TT?",
                                  "¿Las palabras clave han sido clasificadas adecuadamente?",
                                  "¿La presentación del problema a resolver es comprensible?",
                                  "¿El objetivo es preciso y relevante?",
                                  "¿El planteamiento del problema y la tentativa de solución son claros?",
                                  "¿Sus contribuciones o beneficios están completamente justificados?",
                                  "¿Su viabilidad es adecuada?",
                                  "¿La propuesta metodológica es pertinente?",
                                  "¿El calendario de actividades es adecuado?",
                                ].map((pregunta, i) => (
                                  <div key={i} className="mb-2">
                                    <p>{pregunta}</p>
                                    <label>
                                      <input
                                        type="radio"
                                        name={`pregunta-${i}`}
                                        value="Si"
                                        onChange={() => handleRespuesta(i, "Si")}
                                      />{" "}
                                      Si
                                    </label>
                                    <label className="ms-3">
                                      <input
                                        type="radio"
                                        name={`pregunta-${i}`}
                                        value="No"
                                        onChange={() => handleRespuesta(i, "No")}
                                      />{" "}
                                      No
                                    </label>
                                  </div>
                                ))}
                                <button
                                  className="btn btn-success mt-3"
                                  onClick={() => guardarCuestionario(protocolo)}
                                >
                                  Guardar
                                </button>
                              </div>
                            )}
                          </td>
                          <td>
                            <span
                              className={`badge bg-${
                                protocolo.evaluacionFinal === "APROBADO"
                                  ? "success"
                                  : "danger"
                              }`}
                            >
                              {protocolo.evaluacionFinal || "Pendiente"}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-secondary">
                              Regresar evaluación
                            </button>
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

export default ProtocolosAsignados;
