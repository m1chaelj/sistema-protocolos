import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8082";
import "../../recursos/estilos/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../recursos/imagenes/logoESCOM.png";

function DistribucionProtocolos() {
  const [protocolos, setProtocolos] = useState([]); // Lista de protocolos con su estado aislado
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [isVisible, setIsVisible] = useState(false); // Controla si se muestran los protocolos
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/inicio");
  };

  const fetchProtocolos = async () => {
    setIsLoading(true);
    setIsVisible(false);
    try {
      const response = await api.get("/secretario/vista-distribucion-protocolos");
      if (response.data && response.data.length > 0) {
        const initializedProtocolos = response.data.map((protocolo) => ({
          ...protocolo,
          academias: ["", "", ""],
          sinodales: ["", "", ""], // Tres campos de sinodales inicializados
          opcionesSinodales: [[], [], []], // Opciones de sinodales para cada academia
        }));
        setProtocolos(initializedProtocolos);
        setTimeout(() => setIsVisible(true), 500);
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

  const fetchSinodales = async (protocoloIndex, academiaIndex, academia) => {
    if (!academia) {
      setProtocolos((prevProtocolos) =>
        prevProtocolos.map((protocolo, index) =>
          index === protocoloIndex
            ? {
                ...protocolo,
                opcionesSinodales: protocolo.opcionesSinodales.map((sinodales, i) =>
                  i === academiaIndex ? [] : sinodales
                ),
              }
            : protocolo
        )
      );
      return;
    }

    try {
      const response = await api.get(
        `/secretario/vista-distribucion-protocolos/sinodales/${academia}`
      );
      const sinodales = response.data || [];
      setProtocolos((prevProtocolos) =>
        prevProtocolos.map((protocolo, index) =>
          index === protocoloIndex
            ? {
                ...protocolo,
                opcionesSinodales: protocolo.opcionesSinodales.map((opcion, i) =>
                  i === academiaIndex ? sinodales : opcion
                ),
              }
            : protocolo
        )
      );
    } catch (error) {
      console.error("Error al obtener los sinodales:", error);
      alert("Error al cargar los sinodales. Intenta de nuevo.");
    }
  };

  const handleAcademiaChange = (protocoloIndex, academiaIndex, value) => {
    setProtocolos((prevProtocolos) =>
      prevProtocolos.map((protocolo, index) =>
        index === protocoloIndex
          ? {
              ...protocolo,
              academias: protocolo.academias.map((academia, i) =>
                i === academiaIndex ? value : academia
              ),
            }
          : protocolo
      )
    );
    fetchSinodales(protocoloIndex, academiaIndex, value);
  };

  const handleSinodalChange = (protocoloIndex, sinodalIndex, value) => {
    setProtocolos((prevProtocolos) => {
      const protocolo = prevProtocolos[protocoloIndex];
      const sinodalesSeleccionados = protocolo.sinodales;

      if (sinodalesSeleccionados.includes(value)) {
        alert("El sinodal ya está seleccionado en esta fila. Por favor, elige otro.");
        return prevProtocolos; // Evita la actualización
      }

      return prevProtocolos.map((protocolo, index) =>
        index === protocoloIndex
          ? {
              ...protocolo,
              sinodales: protocolo.sinodales.map((sinodal, i) =>
                i === sinodalIndex ? value : sinodal
              ),
            }
          : protocolo
      );
    });
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
                        <th>Título del Protocolo</th>
                        <th>Academias</th>
                        <th>Sinodales</th>
                        <th>N° Registro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {protocolos.map((protocolo, protocoloIndex) => (
                        <tr key={protocolo.id}>
                          <td>{protocolo.nombreEstudiante}</td>
                          <td>
                            {protocolo.primerDirector}
                            <br />
                            {protocolo.segundoDirector}
                          </td>
                          <td>{protocolo.tituloProtocolo}</td>
                          <td>
                            {protocolo.academias.map((academia, academiaIndex) => (
                              <select
                                key={academiaIndex}
                                value={academia}
                                onChange={(e) =>
                                  handleAcademiaChange(protocoloIndex, academiaIndex, e.target.value)
                                }
                                className="form-select"
                              >
                                <option value="">Seleccione una academia</option>
                                <option value="ACC">Ciencias de la Computación</option>
                                <option value="ACS">Ciencias Sociales</option>
                                <option value="IA">Inteligencia Artificial</option>
                              </select>
                            ))}
                          </td>
                          <td>
                            {protocolo.sinodales.map((sinodal, sinodalIndex) => (
                              <select
                                key={sinodalIndex}
                                value={sinodal}
                                onChange={(e) =>
                                  handleSinodalChange(protocoloIndex, sinodalIndex, e.target.value)
                                }
                                className="form-select"
                              >
                                <option value="">Seleccione un sinodal</option>
                                {protocolo.opcionesSinodales[sinodalIndex].map((opcion, i) => (
                                  <option key={i} value={opcion.nombre}>
                                    {opcion.nombre}
                                  </option>
                                ))}
                              </select>
                            ))}
                          </td>
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
