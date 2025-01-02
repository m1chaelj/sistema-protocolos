import React from "react";
import { useNavigate } from "react-router-dom";
import "../../recursos/estilos/custom.css";
import logo from "../../recursos/imagenes/logoESCOM.png";

function InicioSinodal() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/inicio");
  };

  const visualizarProtocolosAsignados = () => {
    navigate("/sinodal/protocolos-asignados");
  };

  return (
    <div
      className="body-background"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Aseguramos que ocupe toda la altura de la pantalla
      }}
    >
      {/* Barra superior */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "#FFFFFF",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "color 0.3s, text-shadow 0.3s", // Transición para el efecto de iluminación
        }}
        onClick={cerrarSesion}
        onMouseEnter={(e) => {
          e.target.style.color = "#007BFF"; // Cambia a color dorado
          e.target.style.textShadow = "0 0 10px #FFD700"; // Efecto de iluminación
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#FFFFFF"; // Regresa al color blanco
          e.target.style.textShadow = "none"; // Quita el efecto de iluminación
        }}
      >
        Cerrar sesión
      </div>

      {/* Contenido principal */}
      <div
        className="fade-in"
        style={{
          textAlign: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo ESCOM"
          style={{
            width: "250px", // Ajustamos el tamaño del logo
            marginBottom: "20px", // Separación del texto "Bienvenid@"
          }}
        />
        <h1
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          Bienvenid@
        </h1>
        <button
          onClick={visualizarProtocolosAsignados}
          className="btn btn-primary"
          style={{
            fontSize: "18px",
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Ir a inspeccionar protocolos asignados.
        </button>
      </div>
    </div>
  );
}

export default InicioSinodal;
