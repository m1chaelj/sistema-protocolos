import React, { useState } from "react";
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
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario((prevDatos) => ({ ...prevDatos, [name]: value }));
  };

  const manejarArchivo = (e) => {
    const file = e.target.files[0];
    setDatosFormulario((prevDatos) => ({ ...prevDatos, file }));
  };

  const enviarArchivo = async () => {
    const { fileName, file } = datosFormulario;

    // Validación: Verificar que el nombre del archivo termine con ".pdf"
    if (!fileName.endsWith(".pdf")) {
      setModalType("warning");
      setModalMessage("El nombre del archivo debe terminar con '.pdf'.");
      setShowModal(true);
      return;
    }

    if (!file || !fileName) {
      setModalType("warning");
      setModalMessage("Por favor, completa todos los campos antes de enviar.");
      setShowModal(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("file", file);

      const response = await api.sendFormData("/subir-pdf/archivo", formData);

      if (response.status === 200 || response.status === 201) {
        setModalType("success");
        setModalMessage("Archivo enviado correctamente.");
        setShowModal(true);
        setTimeout(() => navigate("/alumno/estado-protocolo"), 2000);
      } else {
        throw new Error("Error al enviar el archivo.");
      }
    } catch (error) {
      console.error("Error al enviar el archivo:", error);
      setModalType("warning");
      setModalMessage("Error al enviar el archivo. Intenta de nuevo.");
      setShowModal(true);
    }
  };

  return (
    <div className="body-background">
      <div className="card shadow-lg p-4">
        <h1>Subir archivo</h1>
        <form>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nombre del archivo (agregar al final .pdf)"
            name="fileName"
            value={datosFormulario.fileName}
            onChange={manejarCambio}
          />
          <input
            type="file"
            className="form-control mb-3"
            accept=".pdf"
            name="file"
            onChange={manejarArchivo}
          />
          <button type="button" className="btn btn-primary w-100 mt-3" onClick={enviarArchivo}>
            Confirmar y Enviar
          </button>
        </form>
      </div>

      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: "150px" }} />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "success" ? "Éxito" : "Advertencia"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormularioUnoArchivo;
