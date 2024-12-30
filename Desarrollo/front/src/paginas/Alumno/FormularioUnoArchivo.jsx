import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081";
import "../../recursos/estilos/custom.css";
import advertenciaIcono from "../../recursos/imagenes/advertencia.png";
import logo from "../../recursos/imagenes/logoESCOM.png";

function FormularioUnoArchivo() {
  const [datosFormulario, setDatosFormulario] = useState({
    fileName: "",
    file: null,
  });
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const manejarArchivo = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      file: e.target.files[0],
    });
  };

  const enviarArchivo = async () => {
    if (!datosFormulario.file) {
      alert("Por favor, selecciona un archivo.");
      return;
    }

    if (!datosFormulario.fileName) {
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
        formData.append("fileName", datosFormulario.fileName); // Nombre del archivo
        formData.append("file", datosFormulario.file); // Archivo

        const response = await api.post("/subir-pdf/archivo", formData);
        console.log(response);

        if (response.status === 200 || response.status === 201) {
          alert("Archivo enviado correctamente");
          navigate("/alumno/formulario-dos-integrantes");
        } else {
          alert(
            response.data.message || "Error al enviar el archivo. Intenta de nuevo."
          );
        }
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
              name="fileName"
              value={datosFormulario.fileName}
              onChange={manejarCambio}
            />
          </div>
          <input
            type="file"
            className="form-control mb-3"
            accept=".pdf"
            name="file"
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