import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081"; // Asegúrate de que api8081.js está configurado correctamente
import "../../recursos/estilos/custom.css";
import advertenciaIcono from "../../recursos/imagenes/advertencia.png";
import logo from "../../recursos/imagenes/logoESCOM.png";
import { Modal, Button } from "react-bootstrap";

function FormularioDosIntegrantes() {
  const [integrantes, setIntegrantes] = useState(0);
  const [listaIntegrantes, setListaIntegrantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [integranteIndex, setIntegranteIndex] = useState(null);
  const [isNinguno, setIsNinguno] = useState(false);
  const navigate = useNavigate();

  // Manejar el cambio de la cantidad de integrantes
  const manejarCambioIntegrantes = (e) => {
    const cantidad = parseInt(e.target.value, 10);
    setIntegrantes(cantidad);

    const nuevaLista = [];
    for (let i = 0; i < cantidad; i++) {
      nuevaLista.push({ nombre: "", boleta: "" });
    }
    setListaIntegrantes(nuevaLista);
  };

  // Manejar el cambio en los campos de cada integrante
  const manejarCambioIntegrante = (indice, campo, valor) => {
    setListaIntegrantes((prevLista) => {
      const nuevaLista = [...prevLista];
      nuevaLista[indice][campo] = valor;
      return nuevaLista;
    });
  };

  // Registrar un integrante en el backend
  const registrarIntegrante = async (indice) => {
    const integrante = listaIntegrantes[indice];

    if (!integrante.nombre || !integrante.boleta) {
      alert("Por favor, completa los datos del integrante antes de enviar.");
      return;
    }

    try {
      const response = await api.post("/protocolos/integrantes", {
        nombre: integrante.nombre,
        boleta: integrante.boleta,
      });

      if (response.status === 200 || response.status === 201) {
        alert("Integrante registrado correctamente.");
        navigate("/alumno/formulario-dos-integrantes", { replace: true });
      } else {
        alert("Error al registrar el integrante. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error al registrar el integrante:", error);
      alert("Error al registrar el integrante. Intenta de nuevo.");
    }
  };

  // Manejar el caso de "ningún integrante"
  const manejarNingunIntegrante = async () => {
    try {
      const response = await api.post("/protocolos/integrantes", { integrantes: null });

      if (response.status === 200 || response.status === 201) {
        alert("Registro completado sin integrantes.");
        navigate("/alumno/estado-protocolo");
      } else {
        alert("Error al registrar. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar. Intenta de nuevo.");
    }
  };

  // Abrir el modal de confirmación
  const abrirModal = (indice = null) => {
    setIntegranteIndex(indice);
    setIsNinguno(indice === null);
    setShowModal(true);
  };

  // Confirmar el registro desde el modal
  const confirmarRegistro = () => {
    setShowModal(false);
    if (isNinguno) {
      manejarNingunIntegrante();
    } else {
      registrarIntegrante(integranteIndex);
    }
  };

  return (
    <div className="body-background">
      <div className="card">
        <h1>Registro de integrantes</h1>
        <form>
          <div>
            <label htmlFor="integrantes">
              Cantidad de integrantes secundarios:
            </label>
            <select
              className="form-control select-small"
              id="integrantes"
              name="integrantes"
              value={integrantes}
              onChange={manejarCambioIntegrantes}
            >
              <option value={0}>Ninguno</option>
              <option value={1}>Uno</option>
              <option value={2}>Dos</option>
            </select>
          </div>
          {integrantes === 0 && (
            <button
              type="button"
              className="btn btn-primary w-100 mt-3"
              onClick={() => abrirModal()}
            >
              Confirmar sin integrantes
            </button>
          )}
          {listaIntegrantes.map((integrante, index) => (
            <div key={index} className="dynamic-fields">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Nombre del integrante"
                value={integrante.nombre}
                onChange={(e) =>
                  manejarCambioIntegrante(index, "nombre", e.target.value)
                }
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Número de boleta"
                value={integrante.boleta}
                onChange={(e) =>
                  manejarCambioIntegrante(index, "boleta", e.target.value)
                }
              />
              <button
                type="button"
                className="btn btn-primary mb-3"
                onClick={() => abrirModal(index)}
              >
                Registrar este integrante
              </button>
            </div>
          ))}
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
          <p style={{ textAlign: "center", marginTop: "10px", fontSize: "20px" }}>
            {isNinguno
              ? "Se confirmará que no hay integrantes secundarios. ¿Estás seguro?"
              : "Se enviará la información de este integrante al servidor. ¿Estás seguro?"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarRegistro}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormularioDosIntegrantes;
