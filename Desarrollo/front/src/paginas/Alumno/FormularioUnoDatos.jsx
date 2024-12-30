import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../recursos/estilos/custom.css";
import logo from "../../recursos/imagenes/logoESCOM.png";

function FormularioUnoDatos() {
  const [nombre, setNombre] = useState("");
  const [primerDirector, setPrimerDirector] = useState("");
  const [segundoDirector, setSegundoDirector] = useState("");
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === "nombre") setNombre(value);
    if (name === "primerDirector") setPrimerDirector(value);
    if (name === "segundoDirector") setSegundoDirector(value);
  };

  const siguientePaso = async () => {
    // Validación de campos
    if (!nombre || !primerDirector) {
      alert("Por favor, llena todos los campos obligatorios.");
      return;
    }

    try {
      const response = await api.post("/protocolos/datos", {
        nombre: nombre,
        primerDirector: primerDirector,
        segundoDirector: segundoDirector,
        // Se elimina fechaEntrega de la solicitud
      });

      if (response.status === 200) {
        navigate("/alumno/formulario-uno-archivo");
      } else {
        alert(
          response.data.message || "Error al guardar los datos. Intenta de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert("Error al guardar los datos. Intenta de nuevo.");
    }
  };

  const anteriorPaso = () => {
    navigate("/alumno/formulario-uno-archivo");
  };

  return (
    <div className="body-background">
      <div className="card">
        <h1>Registro de datos</h1>
        <form>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Título del Protocolo"
                name="nombre"
                value={nombre}
                onChange={manejarCambio}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Nombre del primer director"
                name="primerDirector"
                value={primerDirector}
                onChange={manejarCambio}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Nombre del segundo director (o ninguno)"
                name="segundoDirector"
                value={segundoDirector}
                onChange={manejarCambio}
              />
            </div>
            <div className="col-md-6">
              {/* Se elimina el input de fecha */}
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
                  onClick={siguientePaso}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <img
        src={logo}
        alt="Logo ESCOM"
        className="mt-4"
        style={{ width: "150px" }}
      />
    </div>
  );
}

export default FormularioUnoDatos;