import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../recursos/estilos/custom.css";
import advertenciaIcono from "../../recursos/imagenes/advertencia.png";
import logo from "../../recursos/imagenes/logoESCOM.png";

function FormularioUnoArchivo() {
  const [archivo, setArchivo] = useState(null);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const navigate = useNavigate();

  const manejarArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const manejarCambioNombre = (e) => {
    setNombreArchivo(e.target.value);
  };

  const enviarArchivo = async () => {
    if (!archivo) {
      alert("Por favor, selecciona un archivo.");
      return;
    }

    if (!nombreArchivo) {
      alert("Por favor, ingresa un nombre para el archivo.");
      return;
    }

    if (
      window.confirm(
        `<div class="advertencia"> 
           <img src="${advertenciaIcono}" alt="Icono de advertencia" /> 
           <span>ADVERTENCIA</span>
         </div> 
         <p>Al proceder, los datos y archivos ya cargados serán enviados y podrían no ser reversibles.</p>
         <p>¿Estás seguro de que quieres continuar?</p>`
      )
    ) {
      try {
        const formData = new FormData();
        formData.append("fileName", nombreArchivo); // Nombre del archivo
        formData.append("file", archivo); // Archivo

        const response = await api.post("/protocolos/archivo", formData);
        console.log(response);

        navigate("/alumno/formulario-dos-integrantes");
      } catch (error) {
        console.error("Error al enviar el archivo:", error);
        alert("Error al enviar el archivo. Intenta de nuevo.");
      }
    }
  };

  const anteriorPaso = () => {
    navigate("/alumno/formulario-uno-datos");
  };

  return (
    <div className="body-background">
      <div className="card">
        <h1>Subir archivo</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="nombreArchivo" className="form-label">
              Nombre del archivo (agregar al final .pdf)
            </label>
            <input
              type="text"
              className="form-control"
              id="nombreArchivo"
              value={nombreArchivo}
              onChange={manejarCambioNombre}
            />
          </div>
          <input
            type="file"
            className="form-control mb-3"
            accept=".pdf"
            onChange={manejarArchivo}
          />
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={anteriorPaso}
            >
              Anterior
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={enviarArchivo}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      <img
        src={logo}
        alt="Logo ESCOM"
        className="mt-4"
        style={{ width: "150px" }}
      />
    </div>
  );
}

export default FormularioUnoArchivo;