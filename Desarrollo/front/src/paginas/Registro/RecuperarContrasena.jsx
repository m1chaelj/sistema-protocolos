import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8083";
import logo from "../../recursos/imagenes/logoESCOM.png";
import { Modal, Button } from "react-bootstrap";

function RecuperarContrasena() {
  const [boleta, setBoleta] = useState("");
  const [rol, setRol] = useState(""); // Para seleccionar el rol del usuario
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [showModal, setShowModal] = useState(false); // Estado del modal
  const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal
  const [modalType, setModalType] = useState("info"); // Tipo de mensaje: success, warning, error
  const navigate = useNavigate();

  const manejarCambioBoleta = (e) => {
    setBoleta(e.target.value);
  };

  const manejarCambioRol = (e) => {
    setRol(e.target.value);
  };

  const recuperarContrasena = async () => {
    // Validaciones
    if (!boleta.trim() && !rol.trim()) {
      setModalMessage("Por favor, ingresa tu boleta y selecciona un rol.");
      setModalType("warning");
      setShowModal(true);
      return;
    }

    if (!boleta.trim()) {
      setModalMessage("Por favor, ingresa tu boleta.");
      setModalType("warning");
      setShowModal(true);
      return;
    }

    if (!rol.trim()) {
      setModalMessage("Por favor, selecciona un rol.");
      setModalType("warning");
      setShowModal(true);
      return;
    }

    setIsLoading(true);
    setModalMessage("");

    try {
      const response = await api.post(`/${rol}/recuperar/${boleta}`);
      if (response.status === 200) {
        setModalMessage("Correo de recuperación enviado exitosamente. Revisa tu bandeja.");
        setModalType("success");
        setShowModal(true);
      } else {
        setModalMessage("No se pudo enviar el correo de recuperación. Intenta nuevamente.");
        setModalType("warning");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error al recuperar la contraseña:", error.response?.data || error.message);
      setModalMessage("Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.");
      setModalType("danger");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const cerrarModal = () => {
    setShowModal(false);
    if (modalType === "success") {
      navigate("/inicio"); // Redirige a la pantalla de inicio si el mensaje fue exitoso
    }
  };

  return (
    <div className="body-background d-flex flex-column justify-content-center align-items-center">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="text-center mb-4">Recuperar Contraseña</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            recuperarContrasena();
          }}
        >
          <div className="mb-3">
            <label htmlFor="boleta" className="form-label">
              Boleta
            </label>
            <input
              type="text"
              className="form-control"
              id="boleta"
              value={boleta}
              onChange={manejarCambioBoleta}
              placeholder="Ingresa tu boleta"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">
              Selecciona tu rol
            </label>
            <select
              id="rol"
              className="form-select"
              value={rol}
              onChange={manejarCambioRol}
            >
              <option value="" disabled>
                Selecciona tu rol
              </option>
              <option value="alumno">Alumno</option>
              <option value="secretario">Secretario</option>
              <option value="sinodal">Sinodal</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            ) : (
              "Recuperar contraseña"
            )}
          </button>
        </form>
      </div>

      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: "150px" }} />

      {/* Modal para mostrar mensajes */}
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "success" ? "Éxito" : modalType === "warning" ? "Advertencia" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RecuperarContrasena;
