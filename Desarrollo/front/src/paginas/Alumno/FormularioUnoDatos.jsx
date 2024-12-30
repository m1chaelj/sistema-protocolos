import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081";
import "../../recursos/estilos/custom.css";
import logo from "../../recursos/imagenes/logoESCOM.png";

function FormularioUnoDatos() {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    primerDirector: "",
    segundoDirector: "",
  });
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const siguientePaso = async () => {
    // Validación de campos
    if (!datosFormulario.nombre || !datosFormulario.primerDirector) {
      alert("Por favor, llena todos los campos obligatorios.");
      return;
    }

   try {
      const response = await api.post("/registro-protocolo/estudiante", {
        nombre: datosFormulario.nombre,
        primerDirector: datosFormulario.primerDirector,
        segundoDirector: datosFormulario.segundoDirector,
      });
 
      if (response.status === 200 || response.status === 201) {
        alert("Datos guardados correctamente");
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
    // Redirigir a la página anterior (o no hacer nada si es el primer paso)
    // En este caso, como es el primer paso, no hacemos nada
    // o puedes redirigir a la página principal del alumno si la tienes
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
              value={datosFormulario.nombre} // Acceder al valor desde el objeto
              onChange={manejarCambio}
              style={{ width: "100%" }}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Nombre del primer director"
              name="primerDirector"
              value={datosFormulario.primerDirector} // Acceder al valor desde el objeto
              onChange={manejarCambio}
              style={{ width: "100%" }}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Nombre del segundo director (opcional)"
              name="segundoDirector"
              value={datosFormulario.segundoDirector} // Acceder al valor desde el objeto
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
    </div>
  );
}

export default FormularioUnoDatos;