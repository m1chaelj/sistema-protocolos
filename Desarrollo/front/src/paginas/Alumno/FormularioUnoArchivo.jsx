import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081"; // Asegúrate de que api8081.js está configurado correctamente
import "../../recursos/estilos/custom.css";
import logo from "../../recursos/imagenes/logoESCOM.png";

function FormularioUnoArchivo() {
  const [datosFormulario, setDatosFormulario] = useState({
    fileName: "",
    file: null,
  });

  const navigate = useNavigate();

  // Maneja los cambios en los inputs de texto y archivo
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const manejarArchivo = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      file: e.target.files[0], // Archivo seleccionado
    });
  };

  // Enviar el archivo al backend
  const enviarArchivo = async () => {
    if (!datosFormulario.file || !datosFormulario.fileName) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    const confirmarEnvio = window.confirm(
      "¿Estás seguro de que deseas enviar el archivo? Esta acción no se puede deshacer."
    );
    if (!confirmarEnvio) return;

    try {
      // Crear instancia de FormData
      const formData = new FormData();
      formData.append("fileName", datosFormulario.fileName);
      formData.append("file", datosFormulario.file);

      // Enviar FormData al backend
      const response = await api.sendFormData("/subir-pdf/archivo", formData);

      if (response.status === 200 || response.status === 201) {
        alert("Archivo enviado correctamente.");
        navigate("/alumno/formulario-dos-integrantes");
      } else {
        alert("Error al enviar el archivo. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar el archivo:", error.response || error);
      alert("Error al enviar el archivo. Intenta de nuevo.");
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
          <div className="mb-3">
            <label htmlFor="archivo" className="form-label">
              Seleccionar archivo
            </label>
            <input
              type="file"
              className="form-control"
              accept=".pdf"
              id="archivo"
              name="file"
              onChange={manejarArchivo}
            />
          </div>
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
      <div className="text-center mt-4">
        <img
          src={logo}
          alt="Logo ESCOM"
          className="mt-4"
          style={{ width: "150px" }}
        />
      </div>
    </div>
  );
}

export default FormularioUnoArchivo;
