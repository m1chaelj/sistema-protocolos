import React, { useState } from "react";
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
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario((prevDatos) => ({ ...prevDatos, [name]: value }));
  };

  const siguientePaso = async () => {
    if (!datosFormulario.nombre || !datosFormulario.primerDirector) {
      setModalType("warning");
      setModalMessage("Por favor, llena todos los campos obligatorios.");
      setShowModal(true);
      return;
    }

    try {
      const response = await api.post("/registro-protocolo/estudiante", datosFormulario);
      if (response.status === 200 || response.status === 201) {
        setModalType("success");
        setModalMessage("Datos guardados correctamente.");
        setShowModal(true);
        setTimeout(() => navigate("/alumno/formulario-uno-archivo"), 2000);
      } else {
        throw new Error("Error al guardar los datos.");
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      setModalType("warning");
      setModalMessage("Error al guardar los datos. Intenta de nuevo.");
      setShowModal(true);
    }
  };

  const irPaginaInicio = () => {
    navigate("/alumno/pagina-inicio");
  };

  return (
    <div className="body-background">
      <div className="card shadow-lg p-4">
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
          <button type="button" className="btn btn-primary w-100 mt-3" onClick={siguientePaso}>
            Confirmar y Continuar
          </button>
        </form>
      </div>

      <div className="mt-4 text-center">
        <p style={{ color: "white", fontWeight: "bold", fontSize: "1.2rem" }}>En caso de que ya hayas llenado este formulario, da clic en el siguiente botón:</p>
        <button type="button" className="btn btn-primary w-100 mt-3" onClick={irPaginaInicio}>
          Ir a Página de Inicio
        </button>
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

export default FormularioUnoDatos;
