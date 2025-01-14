import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081";
import "../../recursos/estilos/custom.css";
import logo from "../../recursos/imagenes/logoESCOM.png";
import { Modal, Button } from "react-bootstrap";

function FormularioDosIntegrantes() {
  const [integrantes, setIntegrantes] = useState(0);
  const [listaIntegrantes, setListaIntegrantes] = useState([
    { nombre: "", boleta: "" },
    { nombre: "", boleta: "" },
  ]); // Siempre dos integrantes para mapeo
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const manejarCambioIntegrante = (indice, campo, valor) => {
    setListaIntegrantes((prevLista) => {
      const nuevaLista = [...prevLista];
      nuevaLista[indice][campo] = valor;
      return nuevaLista;
    });
  };

  const confirmarRegistro = async () => {
    const [integrante1, integrante2] = listaIntegrantes;

    // Si no hay integrantes secundarios, continuar con el flujo sin errores
    if (integrantes === 0) {
      setShowSuccessModal(true);
      return;
    }

    // Validar datos del primer integrante
    if (!integrante1.nombre || !integrante1.boleta) {
      setErrorMessage("Por favor, completa los datos del primer integrante.");
      setShowErrorModal(true);
      return;
    }

    // Validar datos del segundo integrante si corresponde
    if (integrantes === 2 && (!integrante2.nombre || !integrante2.boleta)) {
      setErrorMessage("Por favor, completa los datos del segundo integrante.");
      setShowErrorModal(true);
      return;
    }

    // Construir payload para enviar al backend
    const payload = {
      nombre: integrante1.nombre || null,
      boleta: integrante1.boleta ? parseInt(integrante1.boleta, 10) : null,
      nombreSegundoIntegrante: integrantes === 2 ? integrante2.nombre : null,
      boletaSegundoIntegrante: integrantes === 2
        ? parseInt(integrante2.boleta, 10)
        : null,
    };

    try {
      const response = await api.post("/registro-protocolo/integrantes", payload);

      if (response.status === 200 || response.status === 201) {
        setShowSuccessModal(true);
      } else {
        setErrorMessage("Error al registrar los integrantes. Intenta de nuevo.");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error al registrar los integrantes:", error);
      setErrorMessage("Error al registrar los integrantes. Intenta de nuevo.");
      setShowErrorModal(true);
    }
  };

  const cerrarModalExito = () => {
    setShowSuccessModal(false);
    navigate("/alumno/pagina-inicio");
  };

  return (
    <div className="body-background">
      <div className="card shadow-lg p-4">
        <h1 className="text-center mb-4">Registro de Integrantes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="integrantes" className="form-label">
              Cantidad de integrantes secundarios:
            </label>
            <select
              className="form-control"
              id="integrantes"
              value={integrantes}
              onChange={(e) => setIntegrantes(parseInt(e.target.value, 10))}
            >
              <option value={0}>Ninguno</option>
              <option value={1}>Uno</option>
              <option value={2}>Dos</option>
            </select>
          </div>

          {/* Campos dinámicos */}
          {integrantes > 0 && (
            <div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Nombre del primer integrante"
                value={listaIntegrantes[0].nombre}
                onChange={(e) => manejarCambioIntegrante(0, "nombre", e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Boleta del primer integrante"
                value={listaIntegrantes[0].boleta}
                onChange={(e) => manejarCambioIntegrante(0, "boleta", e.target.value)}
              />
            </div>
          )}

          {integrantes === 2 && (
            <div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Nombre del segundo integrante"
                value={listaIntegrantes[1].nombre}
                onChange={(e) => manejarCambioIntegrante(1, "nombre", e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Boleta del segundo integrante"
                value={listaIntegrantes[1].boleta}
                onChange={(e) => manejarCambioIntegrante(1, "boleta", e.target.value)}
              />
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary w-100 mt-3"
            onClick={confirmarRegistro}
          >
            Confirmar y Registrar
          </button>
        </form>
      </div>

      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: "150px" }} />

      {/* Modal de error */}
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

      {/* Modal de éxito */}
      <Modal show={showSuccessModal} onHide={cerrarModalExito}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {integrantes === 0
            ? "No se registraron integrantes secundarios."
            : "Integrantes registrados correctamente."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModalExito}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormularioDosIntegrantes;
