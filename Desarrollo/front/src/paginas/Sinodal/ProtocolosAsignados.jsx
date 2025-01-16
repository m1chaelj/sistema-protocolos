import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8084";
import api2 from "../../api/api8085";
import "../../recursos/estilos/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../recursos/imagenes/logoESCOM.png";
import descargarIcono from "../../recursos/imagenes/descargar-pdf.png";

function ProtocolosAsignados() {
  const [academia, setAcademia] = useState("");
  const [protocolos, setProtocolos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProtocolo, setSelectedProtocolo] = useState(null);
  const [evaluacion, setEvaluacion] = useState([]);
  const [nombreSinodal, setNombreSinodal] = useState("");
  const [academiaSinodal, setAcademiaSinodal] = useState("");
  const [evaluacionFinal, setEvaluacionFinal] = useState("");

  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/inicio");
  };

  const buscarProtocolos = useCallback(async () => {
    setIsLoading(true);
    setProtocolos([]);
    try {
      const response = await api.get(`/sinodal/protocolos/${academia}`);
      if (response.data) {
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setProtocolos(data);
      } else {
        setProtocolos([]);
      }
    } catch (error) {
      console.error("Error al buscar protocolos:", error);
      alert("Hubo un error al buscar los protocolos. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }, [academia]);

  const evaluarProtocolo = (protocolo) => {
    const preguntas = [
      { pregunta: "¿El título corresponde al producto esperado?", respuesta: "" },
      { pregunta: "¿El resumen expresa claramente la propuesta del TT, su importancia y aplicación?", respuesta: "" },
      { pregunta: "¿Las palabras clave han sido clasificadas adecuadamente?", respuesta: "" },
      { pregunta: "¿La presentación del problema a resolver es comprensible?", respuesta: "" },
      { pregunta: "¿El objetivo es preciso y relevante?", respuesta: "" },
      { pregunta: "¿El planteamiento del problema y la tentativa solución descrita son claros?", respuesta: "" },
      { pregunta: "¿Sus contribuciones o beneficios están completamente justificados?", respuesta: "" },
      { pregunta: "¿Su viabilidad es adecuada?", respuesta: "" },
      { pregunta: "¿La propuesta metodológica es pertinente?", respuesta: "" },
      { pregunta: "¿El calendario de actividades por estudiante es adecuado?", respuesta: "" },
    ];
    setSelectedProtocolo(protocolo);
    setEvaluacion(preguntas);
  };

  const enviarEvaluacion = async () => {
    if (!selectedProtocolo) {
      alert("No hay protocolo seleccionado para evaluar.");
      return;
    }

    if (!nombreSinodal || !academiaSinodal) {
      alert("Por favor, confirma tu nombre y academia antes de enviar la evaluación.");
      return;
    }

    if (!evaluacionFinal) {
      alert("Por favor, selecciona la evaluación final.");
      return;
    }

    setIsLoading(true);

    try {
      const respuestasString = `
        Nombre del Sinodal: ${nombreSinodal}
        Academia del Sinodal: ${academiaSinodal}
        Protocolo Evaluado: ${selectedProtocolo.tituloProtocolo}
        Respuestas:
        ${evaluacion
          .map((pregunta) => `${pregunta.pregunta}: ${pregunta.respuesta || "No respondida"}`)
          .join("\n")}
        Evaluación Final: ${evaluacionFinal}
      `;

      const response = await api2.post("/calificar", respuestasString, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Evaluación enviada exitosamente.");
        setSelectedProtocolo(null);
        setEvaluacion([]);
        setNombreSinodal("");
        setAcademiaSinodal("");
        setEvaluacionFinal(""); // Limpia la evaluación final después del envío
        buscarProtocolos();
      } else {
        alert("Hubo un problema al enviar la evaluación. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar evaluación:", error.response?.data || error.message);
      alert("Hubo un error al enviar la evaluación. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    } 
  };


  const descargarPDF = (archivo) => {
    try {
      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${archivo}`;
      link.download = "protocolo.pdf";
      link.click();
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      alert("No se pudo descargar el PDF. Intenta nuevamente.");
    }
  };

  const handleRespuestaChange = (index, respuesta) => {
    const updatedEvaluacion = [...evaluacion];
    updatedEvaluacion[index].respuesta = respuesta;
    setEvaluacion(updatedEvaluacion);
  };

  useEffect(() => {
    if (academia) {
      buscarProtocolos();
    } else {
      setProtocolos([]);
    }
  }, [academia, buscarProtocolos]);

  return (
    <div className="body-background">
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
      >
        Cerrar sesión
      </div>

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card shadow-lg p-4" style={{ width: "95%", maxWidth: "1400px" }}>
          <div className="card-body">
            <h1 className="text-center mb-4">Buscar Protocolos por Academia</h1>
            <div className="input-group mb-4">
              <select
                className="form-select"
                value={academia}
                onChange={(e) => setAcademia(e.target.value)}
                style={{ fontSize: "18px", padding: "10px" }}
              >
                <option value="">Selecciona una academia</option>
                <option value="IA">IA</option>
                <option value="ACC">ACC</option>
                <option value="ACS">ACS</option>
              </select>
            </div>
            {isLoading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : (
              protocolos.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover text-center">
                    <thead className="table-primary">
                      <tr>
                        <th style={{ width: "15%" }}>Título del Protocolo</th>
                        <th style={{ width: "15%" }}>Nombre del Estudiante</th>
                        <th style={{ width: "15%" }}>Primer Director</th>
                        <th style={{ width: "15%" }}>Segundo Director</th>
                        <th style={{ width: "10%" }}>N° Registro</th>
                        <th style={{ width: "10%" }}>Academia</th>
                        <th style={{ width: "15%" }}>Descargar PDF</th>
                        <th style={{ width: "15%" }}>Evaluar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {protocolos.map((protocolo, index) => (
                        <tr key={index}>
                          <td>{protocolo.tituloProtocolo}</td>
                          <td>{protocolo.nombreEstudiante}</td>
                          <td>{protocolo.primerDirector}</td>
                          <td>{protocolo.segundoDirector}</td>
                          <td>{protocolo.registro}</td>
                          <td>{protocolo.academia}</td>
                          <td>
                            <img
                              src={descargarIcono}
                              alt="Descargar PDF"
                              style={{ cursor: "pointer", width: "40px" }}
                              onClick={() => descargarPDF(protocolo.archivo)}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              style={{ fontSize: "16px", padding: "10px 20px" }}
                              onClick={() => evaluarProtocolo(protocolo)}
                            >
                              Evaluar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-muted">No se encontraron protocolos para esta academia.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {selectedProtocolo && (
        <div
          className="fixed-top d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            height: "100vh",
            width: "100%",
            zIndex: 1050,
            overflow: "auto",
          }}
        >
          <div
            style={{
              width: "80%",
              maxWidth: "800px",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <h2 className="text-center mb-4">Evaluar Protocolo</h2>
            <div className="mb-4">
              <label htmlFor="nombreSinodal" className="form-label" style={{ fontSize: "18px" }}>
                Confirma su nombre:
              </label>
              <input
                type="text"
                id="nombreSinodal"
                className="form-control"
                placeholder="Ingresa tu nombre"
                value={nombreSinodal}
                onChange={(e) => setNombreSinodal(e.target.value)}
                style={{ fontSize: "18px", padding: "10px" }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="academiaSinodal" className="form-label" style={{ fontSize: "18px" }}>
                Confirme su academia:
              </label>
              <select
                id="academiaSinodal"
                className="form-select"
                value={academiaSinodal}
                onChange={(e) => setAcademiaSinodal(e.target.value)}
                style={{ fontSize: "18px", padding: "10px" }}
              >
                <option value="">Selecciona una academia</option>
                <option value="IA">IA</option>
                <option value="ACC">ACC</option>
                <option value="ACS">ACS</option>
              </select>
            </div>
            {evaluacion.map((pregunta, index) => (
              <div key={index} className="mb-4" style={{ fontSize: "18px" }}>
                <p>{pregunta.pregunta}</p>
                <div>
                  <label style={{ marginRight: "20px" }}>
                    <input
                      type="radio"
                      name={`respuesta-${index}`}
                      value="Sí"
                      checked={pregunta.respuesta === "Sí"}
                      onChange={() => handleRespuestaChange(index, "Sí")}
                    />{" "}
                    Sí
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`respuesta-${index}`}
                      value="No"
                      checked={pregunta.respuesta === "No"}
                      onChange={() => handleRespuestaChange(index, "No")}
                    />{" "}
                    No
                  </label>
                </div>
              </div>
            ))}
            <div className="mb-4">
            <label className="form-label" style={{ fontSize: "18px" }}>
              Evaluación Final:
            </label>
            <div className="d-flex justify-content-around">
              <button
                className="btn"
                style={{
                  backgroundColor: evaluacionFinal === "Aprobado" ? "#28a745" : "#6c757d",
                  color: "#fff",
                  fontSize: "16px",
                }}
                onClick={() => setEvaluacionFinal("Aprobado")}
              >
                Aprobado
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: evaluacionFinal === "Rechazado" ? "#dc3545" : "#6c757d",
                  color: "#fff",
                  fontSize: "16px",
                }}
                onClick={() => setEvaluacionFinal("Rechazado")}
              >
                Rechazado
              </button>
            </div>
          </div>
            <button
              className="btn btn-success w-100 mt-4"
              style={{ fontSize: "18px", padding: "10px" }}
              onClick={enviarEvaluacion}
            >
              Enviar Evaluación
            </button>
            <button
              className="btn btn-danger w-100 mt-2"
              style={{ fontSize: "18px", padding: "10px" }}
              onClick={() => {
                setSelectedProtocolo(null);
                setEvaluacion([]);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

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
