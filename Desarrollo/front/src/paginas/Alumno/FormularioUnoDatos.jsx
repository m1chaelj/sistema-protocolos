import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081";
import "../../recursos/estilos/custom.css";
import advertenciaIcono from "../../recursos/imagenes/advertencia.png";
import comprobadoIcono from "../../recursos/imagenes/comprobado.png";
import logo from "../../recursos/imagenes/logoESCOM.png";
import { Modal, Button } from "react-bootstrap";

function FormularioUnoDatos() {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    primerDirector: "",
    segundoDirector: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success"); // Puede ser "success" o "warning"
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const siguientePaso = async () => {
    if (!datosFormulario.nombre || !datosFormulario.primerDirector) {
      setModalType("warning");
      setModalMessage("Por favor, llena todos los campos obligatorios.");
      setShowModal(true);
      return;
    }

    try {
      const response = await api.post("/registro-protocolo/estudiante", {
        nombre: datosFormulario.nombre,
        primerDirector: datosFormulario.primerDirector,
        segundoDirector: datosFormulario.segundoDirector,
      });

      if (response.status === 200 || response.status === 201) {
        setModalType("success");
        setModalMessage("Datos guardados correctamente.");
        setShowModal(true);
        setTimeout(() => navigate("/alumno/formulario-uno-archivo"), 2000);
      } else {
        setModalType("warning");
        setModalMessage(
          response.data.message || "Error al guardar los datos. Intenta de nuevo."
        );
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      setModalType("warning");
      setModalMessage("Error al guardar los datos. Intenta de nuevo.");
      setShowModal(true);
    }
  };

  const anteriorPaso = () => {
    // No hay paso anterior
  };

  return (
    <div className="body-background">
      <div className="card">
        <h1>Registro de datos</h1>
        <form>
          <div>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Título del Protocolo"
              name="nombre"
              value={datosFormulario.nombre}
              onChange={manejarCambio}
              style={{ width: "100%" }}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Nombre del primer director"
              name="primerDirector"
              value={datosFormulario.primerDirector}
              onChange={manejarCambio}
              style={{ width: "100%" }}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Nombre del segundo director (opcional)"
              name="segundoDirector"
              value={datosFormulario.segundoDirector}
              onChange={manejarCambio}
              style={{ width: "100%" }}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={anteriorPaso}
              disabled
            >
              Anterior
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={siguientePaso}
            >
              Siguiente
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

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "success" ? "Éxito" : "Advertencia"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img
              src={modalType === "success" ? comprobadoIcono : advertenciaIcono}
              alt="Icono"
              style={{
                width: "50px",
                marginBottom: "15px",
              }}
            />
            <p style={{ fontSize: "18px" }}>{modalMessage}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormularioUnoDatos;