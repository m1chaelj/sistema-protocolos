import React, { useState } from "react";
import api from "../../api/api"; // Importa el cliente Axios
import logo from "../../recursos/imagenes/logoESCOM.png";
import { Modal, Button } from "react-bootstrap";

function RegistroDirector() {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    boleta: "",
    correo: "",
    password: "",
    confirmarPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Estado para el icono de carga
  const [showModal, setShowModal] = useState(false); // Estado del modal
  const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal
  const [modalType, setModalType] = useState("info"); // Tipo de mensaje: success, warning, error
  const [registroExitoso, setRegistroExitoso] = useState(false); // Controla si se completó el registro

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const validarFormulario = () => {
    const { nombre, apellidoPaterno, apellidoMaterno, boleta, correo, password, confirmarPassword } = datosFormulario;

    // Campos vacíos
    if (
      !nombre.trim() ||
      !apellidoPaterno.trim() ||
      !apellidoMaterno.trim() ||
      !boleta.trim() ||
      !correo.trim() ||
      !password.trim() ||
      !confirmarPassword.trim()
    ) {
      setModalMessage("Por favor, completa todos los campos antes de continuar.");
      setModalType("warning");
      setShowModal(true);
      return false;
    }

    // Validaciones específicas
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
      setModalMessage("El nombre debe contener solo letras y espacios.");
      setModalType("warning");
      setShowModal(true);
      return false;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidoPaterno)) {
      setModalMessage("El apellido paterno debe contener solo letras y espacios.");
      setModalType("warning");
      setShowModal(true);
      return false;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidoMaterno)) {
      setModalMessage("El apellido materno debe contener solo letras y espacios.");
      setModalType("warning");
      setShowModal(true);
      return false;
    }

    if (!/^\d{10}$/.test(boleta)) {
      setModalMessage("La boleta debe tener exactamente 10 dígitos numéricos.");
      setModalType("warning");
      setShowModal(true);
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setModalMessage("Por favor, ingresa un correo electrónico válido.");
      setModalType("warning");
      setShowModal(true);
      return false;
    }

    if (password.length < 8) {
      setModalMessage("La contraseña debe tener al menos 8 caracteres.");
      setModalType("warning");
      setShowModal(true);
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      setModalMessage("La contraseña debe contener al menos una letra mayúscula.");
      setModalType("warning");
      setShowModal(true);
      return false;
    }

    if (password !== confirmarPassword) {
      setModalMessage("Las contraseñas no coinciden.");
      setModalType("warning");
      setShowModal(true);
      return false;
    }

    return true;
  };

  const manejarRegistro = async () => {
    if (!validarFormulario()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/registrarse/secretario", {
        nombre: datosFormulario.nombre,
        apellidoPaterno: datosFormulario.apellidoPaterno,
        apellidoMaterno: datosFormulario.apellidoMaterno,
        boleta: datosFormulario.boleta,
        correoElectronico: datosFormulario.correo,
        contrasena: datosFormulario.password,
      });

      if (response.status === 200 || response.status === 201) {
        setRegistroExitoso(true);
      } else {
        setModalMessage("Hubo un problema al registrar. Intenta de nuevo.");
        setModalType("warning");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error.message);
      setModalMessage("Hubo un error al registrar. Intenta de nuevo.");
      setModalType("danger");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="body-background d-flex flex-column justify-content-center align-items-center">
      {!registroExitoso ? (
        <div className="card p-4" style={{ maxWidth: "800px", width: "100%" }}>
          <h1 className="text-center mb-4">Registro de Secretario CATT</h1>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Nombre"
                name="nombre"
                value={datosFormulario.nombre}
                onChange={manejarCambio}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Apellido paterno"
                name="apellidoPaterno"
                value={datosFormulario.apellidoPaterno}
                onChange={manejarCambio}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Apellido materno"
                name="apellidoMaterno"
                value={datosFormulario.apellidoMaterno}
                onChange={manejarCambio}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Número de boleta"
                name="boleta"
                value={datosFormulario.boleta}
                onChange={manejarCambio}
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Correo electrónico"
                name="correo"
                value={datosFormulario.correo}
                onChange={manejarCambio}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Contraseña"
                name="password"
                value={datosFormulario.password}
                onChange={manejarCambio}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirmar contraseña"
                name="confirmarPassword"
                value={datosFormulario.confirmarPassword}
                onChange={manejarCambio}
              />
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={manejarRegistro}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                ) : (
                  "Aceptar"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-4 text-center" style={{ maxWidth: "800px", width: "100%" }}>
          <h2 className="mb-4">
            Gracias por tu registro. Por favor, revisa tu correo electrónico para confirmar tu cuenta.
          </h2>
          <p className="text-muted">Ya puedes cerrar esta pestaña.</p>
        </div>
      )}
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: "150px" }} />

      {/* Modal para mensajes */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "success" ? "Éxito" : modalType === "warning" ? "Advertencia" : "Error"}
          </Modal.Title>
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

export default RegistroDirector;
