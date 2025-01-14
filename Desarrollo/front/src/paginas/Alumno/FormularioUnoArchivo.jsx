import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081";
import "../../recursos/estilos/custom.css";
import logo from "../../recursos/imagenes/logoESCOM.png";
import { Modal, Button } from "react-bootstrap";

function FormularioUnoArchivo() {
  const navigate = useNavigate();
  const [datosFormulario, setDatosFormulario] = useState({
    fileName: "",
    file: null,
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Cargar datos desde localStorage
  useEffect(() => {
    const datosGuardados = localStorage.getItem("formularioUnoArchivo");
    if (datosGuardados) {
      setDatosFormulario(JSON.parse(datosGuardados));
    }
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    const nuevosDatos = { ...datosFormulario, [name]: value };
    setDatosFormulario(nuevosDatos);
    localStorage.setItem("formularioUnoArchivo", JSON.stringify(nuevosDatos)); // Guardar en localStorage
  };

  const manejarArchivo = (e) => {
    const file = e.target.files[0];
    const nuevosDatos = { ...datosFormulario, file };
    setDatosFormulario(nuevosDatos);
    localStorage.setItem("formularioUnoArchivo", JSON.stringify(nuevosDatos)); // Guardar en localStorage
  };

  const enviarArchivo = async () => {
    try {
      const formData = new FormData();
      formData.append("fileName", datosFormulario.fileName);
      formData.append("file", datosFormulario.file);

      const response = await api.sendFormData("/subir-pdf/archivo", formData);

      if (response.status === 200 || response.status === 201) {
        setShowSuccessModal(true);
      } else {
        setErrorMessage("Error al enviar el archivo. Intenta de nuevo.");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error al enviar el archivo:", error.response || error);
      setErrorMessage("Error al enviar el archivo. Intenta de nuevo.");
      setShowErrorModal(true);
    }
  };

  const abrirConfirmacion = () => {
    if (!datosFormulario.file || !datosFormulario.fileName) {
      setErrorMessage("Por favor, completa todos los campos antes de enviar.");
      setShowErrorModal(true);
      return;
    }
    setShowConfirmationModal(true);
  };

  const confirmarEnvio = () => {
    setShowConfirmationModal(false);
    enviarArchivo();
  };

  const cerrarModalExito = () => {
    setShowSuccessModal(false);
    navigate("/alumno/formulario-dos-integrantes");
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
              onClick={abrirConfirmacion}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: "150px" }} />

      {/* Modal */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar envío</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de enviar este archivo?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarEnvio}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={cerrarModalExito}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>Archivo enviado correctamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModalExito}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormularioUnoArchivo;
