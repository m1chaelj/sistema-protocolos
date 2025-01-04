import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081";
import "../../recursos/estilos/custom.css";
import advertenciaIcono from "../../recursos/imagenes/advertencia.png";
import comprobadoIcono from "../../recursos/imagenes/comprobado.png";
import logo from "../../recursos/imagenes/logoESCOM.png";
import { Modal, Button } from "react-bootstrap";

function FormularioUnoArchivo() {
  const [datosFormulario, setDatosFormulario] = useState({
    fileName: "",
    file: null,
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const manejarArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      if (archivo.size > 1024 * 1024) { // 1 MB en bytes
        setErrorMessage("El archivo supera el límite de 1 MB. Por favor, selecciona un archivo más pequeño.");
        setShowErrorModal(true);
        return;
      }
      setDatosFormulario({
        ...datosFormulario,
        file: archivo,
      });
    }
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
              Nombre del archivo, max. 1 MB (agregar al final .pdf)
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
      <div className="text-center mt-4">
        <img
          src={logo}
          alt="Logo ESCOM"
          className="mt-4"
          style={{ width: "150px" }}
        />
      </div>

      {/* Modal de confirmación */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="advertencia text-center">
            <img
              src={advertenciaIcono}
              alt="Icono de advertencia"
              style={{
                width: "50px",
                marginBottom: "15px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <span style={{ fontWeight: "bold", fontSize: "20px", display: "block" }}>
              ADVERTENCIA
            </span>
          </div>
          <p style={{ textAlign: "center", marginTop: "10px", fontSize: "16px" }}>
            ¿Estás seguro de que deseas enviar el archivo? Esta acción no se puede deshacer.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarEnvio}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de éxito */}
      <Modal show={showSuccessModal} onHide={cerrarModalExito}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="advertencia text-center">
            <img
              src={comprobadoIcono}
              alt="Icono de éxito"
              style={{
                width: "50px",
                marginBottom: "15px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <span style={{ fontWeight: "bold", fontSize: "20px", display: "block" }}>
              ÉXITO
            </span>
          </div>
          <p style={{ textAlign: "center", marginTop: "10px", fontSize: "16px" }}>
            El archivo ha sido enviado correctamente.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={cerrarModalExito}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de error */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="advertencia text-center">
            <img
              src={advertenciaIcono}
              alt="Icono de advertencia"
              style={{
                width: "50px",
                marginBottom: "15px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <span style={{ fontWeight: "bold", fontSize: "20px", display: "block" }}>
              ERROR
            </span>
          </div>
          <p style={{ textAlign: "center", marginTop: "10px", fontSize: "16px" }}>
            {errorMessage}
          </p>
        </Modal.Body>
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
