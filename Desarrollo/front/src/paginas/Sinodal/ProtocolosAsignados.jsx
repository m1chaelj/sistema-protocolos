import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8084";
import "../../recursos/estilos/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../recursos/imagenes/logoESCOM.png";
import ojoIcono from "../../recursos/imagenes/ojo.png";
import descargarIcono from "../../recursos/imagenes/descargar-pdf.png";

function ProtocolosAsignados() {
  const [academia, setAcademia] = useState("");
  const [protocolos, setProtocolos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/inicio");
  };

  const buscarProtocolos = useCallback(async () => {
    setIsLoading(true); // Muestra el estado de carga
    setProtocolos([]); // Limpia la tabla antes de cargar nuevos datos
    try {
      const response = await api.get(`/sinodal/protocolos/${academia}`);
      if (response.data) {
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setProtocolos(data);
      } else {
        setProtocolos([]); // Si no hay datos, vacía la tabla
      }
    } catch (error) {
      console.error("Error al buscar protocolos:", error);
      alert("Hubo un error al buscar los protocolos. Intenta de nuevo.");
    } finally {
      setIsLoading(false); // Oculta el estado de carga
    }
  }, [academia]);

  useEffect(() => {
    if (academia) {
      buscarProtocolos();
    } else {
      setProtocolos([]);
    }
  }, [academia, buscarProtocolos]);

  const visualizarPDF = (archivo) => {
    try {
      const pdfData = `data:application/pdf;base64,${archivo}`;
      setSelectedPDF(pdfData);
    } catch (error) {
      console.error("Error al visualizar el PDF:", error);
      alert("No se pudo cargar el PDF. Verifica el archivo.");
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

  const regresarProtocolo = async (protocolo) => {
    try {
      await api.post(`/sinodal/protocolos/${protocolo.id}/regresar`); // Eliminamos `response` ya que no se utiliza
      alert(`Protocolo "${protocolo.tituloProtocolo}" regresado exitosamente.`);
      buscarProtocolos(); // Actualizar la lista de protocolos
    } catch (error) {
      console.error("Error al regresar el protocolo:", error);
      alert("Hubo un error al regresar el protocolo. Intenta de nuevo.");
    }
  };

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

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card shadow-lg p-4" style={{ width: "90%", maxWidth: "1200px" }}>
          <div className="card-body">
            <h1 className="text-center mb-4">Buscar Protocolos por Academia</h1>
            <div className="input-group mb-4">
              <select
                className="form-select"
                value={academia}
                onChange={(e) => setAcademia(e.target.value)}
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
                        <th>Título del Protocolo</th>
                        <th>Nombre del Estudiante</th>
                        <th>Primer Director</th>
                        <th>Segundo Director</th>
                        <th>N° Registro</th>
                        <th>Academia</th>
                        <th>Verificación</th>
                        <th>Acciones</th>
                        <th>Regresar</th>
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
                          <td>{protocolo.verificacion}</td>
                          <td>
                            <div className="d-flex justify-content-center gap-3">
                              <img
                                src={ojoIcono}
                                alt="Visualizar PDF"
                                style={{ cursor: "pointer", width: "45px" }}
                                onClick={() => visualizarPDF(protocolo.archivo)}
                              />
                              <img
                                src={descargarIcono}
                                alt="Descargar PDF"
                                style={{ cursor: "pointer", width: "45px" }}
                                onClick={() => descargarPDF(protocolo.archivo)}
                              />
                            </div>
                          </td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => regresarProtocolo(protocolo)}
                            >
                              Regresar
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

      {selectedPDF && (
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
              width: "100%",
              height: "100%",
              maxWidth: "1400px",
              maxHeight: "100vh",
              backgroundColor: "#fff",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1 className="text-center mb-4">Vista previa del protocolo</h1>
            <iframe
              src={selectedPDF}
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "8px",
                overflow: "auto",
              }}
              title="Vista previa del PDF"
            ></iframe>
            <button
              className="btn btn-danger"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1060,
              }}
              onClick={() => setSelectedPDF(null)}
            >
              Cerrar
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
