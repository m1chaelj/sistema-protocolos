import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081";
import "../../recursos/estilos/custom.css";
import logo from "../../recursos/imagenes/logoESCOM.png";
import { Modal, Button } from "react-bootstrap";

function FormularioUnoDatos() {
  const navigate = useNavigate();
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    primerDirector: "",
    segundoDirector: "",
  });
  const [yaEnviado, setYaEnviado] = useState(false); // Estado para controlar si los datos ya fueron enviados
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success"); // Puede ser "success" o "warning"
  const [modalMessage, setModalMessage] = useState("");

  // Cargar datos desde localStorage
  useEffect(() => {
    const datosGuardados = localStorage.getItem("formularioUnoDatos");
    const enviadoGuardado = localStorage.getItem("formularioUnoDatosEnviado");
    if (datosGuardados) {
      setDatosFormulario(JSON.parse(datosGuardados));
    }
    if (enviadoGuardado === "true") {
      setYaEnviado(true); // Si ya fue enviado, establecer el estado correspondiente
    }
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    const nuevosDatos = { ...datosFormulario, [name]: value };
    setDatosFormulario(nuevosDatos);
    localStorage.setItem("formularioUnoDatos", JSON.stringify(nuevosDatos)); // Guardar en localStorage
  };

  const siguientePaso = async () => {
    if (!datosFormulario.nombre || !datosFormulario.primerDirector) {
      setModalType("warning");
      setModalMessage("Por favor, llena todos los campos obligatorios.");
      setShowModal(true);
      return;
    }

    if (yaEnviado) {
      // Si los datos ya fueron enviados, no los enviamos de nuevo, solo avanzamos
      navigate("/alumno/formulario-uno-archivo");
      return;
    }

    try {
      const response = await api.post("/registro-protocolo/estudiante", datosFormulario);
      if (response.status === 200 || response.status === 201) {
        setModalType("success");
        setModalMessage("Datos guardados correctamente.");
        setShowModal(true);
        setYaEnviado(true); // Marcar como enviados
        localStorage.setItem("formularioUnoDatosEnviado", "true"); // Guardar estado en localStorage
        setTimeout(() => navigate("/alumno/formulario-uno-archivo"), 2000);
      } else {
        setModalType("warning");
        setModalMessage("Error al guardar los datos. Intenta de nuevo.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      setModalType("warning");
      setModalMessage("Error al guardar los datos. Intenta de nuevo.");
      setShowModal(true);
    }
  };

  const irEstadoProtocolo = () => {
    navigate("/alumno/estado-protocolo");
  };

  return (
    <div className="body-background">
      <div className="card">
        <h1>Registro de datos</h1>
        <form>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Título del Protocolo"
            name="nombre"
            value={datosFormulario.nombre}
            onChange={manejarCambio}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nombre del primer director"
            name="primerDirector"
            value={datosFormulario.primerDirector}
            onChange={manejarCambio}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nombre del segundo director (opcional)"
            name="segundoDirector"
            value={datosFormulario.segundoDirector}
            onChange={manejarCambio}
          />
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" disabled>
              Anterior
            </button>
            <button type="button" className="btn btn-primary" onClick={siguientePaso}>
              Siguiente
            </button>
          </div>
        </form>
      </div>

      {yaEnviado && (
        <div className="text-center mt-5">
          <p className="text-white fw-bold fs-5 mb-3">
            En caso de ya haber llenado este formulario anteriormente, da click aquí:
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={irEstadoProtocolo}
            style={{ fontSize: "1rem", padding: "10px 20px" }}
          >
            Ir a Estado del Protocolo
          </button>
        </div>
      )}

      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: "150px" }} />

      {/* Modal */}
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

export default FormularioUnoDatos;
