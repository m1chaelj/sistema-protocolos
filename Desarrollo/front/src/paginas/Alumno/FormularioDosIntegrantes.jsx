import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081";
import "../../recursos/estilos/custom.css";
import { Modal, Button } from "react-bootstrap";
import advertenciaIcono from "../../recursos/imagenes/advertencia.png";
import logo from "../../recursos/imagenes/logoESCOM.png";

function FormularioDosIntegrantes() {
  const [integrantes, setIntegrantes] = useState(0);
  const [listaIntegrantes, setListaIntegrantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Manejar cambio en el selector de cantidad de integrantes
  const manejarCambioIntegrantes = (e) => {
    const cantidad = parseInt(e.target.value, 10);
    setIntegrantes(cantidad);

    // Crear lista dinámica para los integrantes
    const nuevaLista = Array.from({ length: cantidad }, () => ({
      nombre: "",
      boleta: "",
    }));
    setListaIntegrantes(nuevaLista);
  };

  // Manejar cambio en los campos dinámicos
  const manejarCambioIntegrante = (indice, campo, valor) => {
    setListaIntegrantes((prevLista) => {
      const nuevaLista = [...prevLista];
      nuevaLista[indice][campo] = valor;
      return nuevaLista;
    });
  };

  // Enviar datos al backend
  const confirmarRegistro = async () => {
    if (listaIntegrantes.some((i) => !i.nombre || !i.boleta)) {
      alert("Por favor, completa todos los campos de los integrantes.");
      return;
    }

    try {
      const response = await api.post("/registro-protocolo/integrantes", listaIntegrantes);

      if (response.status === 200 || response.status === 201) {
        alert("Integrantes registrados correctamente.");
        navigate("/alumno/pagina-inicio", { replace: true });
      } else {
        alert("Error al registrar los integrantes. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error al registrar los integrantes:", error);
      alert("Error al registrar los integrantes. Intenta de nuevo.");
    }
  };

  return (
    <div className="body-background">
      <div className="card">
        <h1 className="text-center">Registro de Integrantes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="integrantes" className="form-label">
              Cantidad de integrantes secundarios:
            </label>
            <select
              className="form-control"
              id="integrantes"
              value={integrantes}
              onChange={manejarCambioIntegrantes}
            >
              <option value={0}>Ninguno</option>
              <option value={1}>Uno</option>
              <option value={2}>Dos</option>
            </select>
          </div>

          {/* Campos dinámicos */}
          {listaIntegrantes.map((integrante, index) => (
            <div
              key={index}
              className="fade-in dynamic-fields"
              style={{
                animation: "fadeIn 0.5s ease-in-out",
              }}
            >
              <input
                type="text"
                className="form-control mb-3"
                placeholder={`Nombre del integrante ${index + 1}`}
                value={integrante.nombre}
                onChange={(e) => manejarCambioIntegrante(index, "nombre", e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder={`Boleta del integrante ${index + 1}`}
                value={integrante.boleta}
                onChange={(e) => manejarCambioIntegrante(index, "boleta", e.target.value)}
              />
            </div>
          ))}

          {/* Botón de confirmar y registrar */}
          {integrantes > 0 && (
            <button
              type="button"
              className="btn btn-primary w-100 mt-3 fade-in"
              style={{
                animation: "fadeIn 0.5s ease-in-out",
              }}
              onClick={confirmarRegistro}
            >
              Confirmar y Registrar
            </button>
          )}
        </form>
      </div>

      {/* Logo */}
      <img
        src={logo}
        alt="Logo ESCOM"
        className="mt-4"
        style={{
          width: "150px",
          animation: "fadeIn 1s ease-in-out",
        }}
      />

      {/* Modal (si lo necesitas para confirmaciones adicionales) */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img
              src={advertenciaIcono}
              alt="Advertencia"
              style={{
                width: "50px",
                marginBottom: "15px",
              }}
            />
            <p>¿Estás seguro de que deseas registrar los integrantes?</p>
          </div>
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
