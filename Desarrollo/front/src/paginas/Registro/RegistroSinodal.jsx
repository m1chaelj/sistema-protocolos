import React, { useState } from "react";
import api from "../../api/api"; // Importa el cliente Axios
import logo from "../../recursos/imagenes/logoESCOM.png";

function RegistroSinodal() {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    boleta: "",
    correo: "",
    password: "",
    confirmarPassword: "",
    academia: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Estado para el icono de carga
  const [registroExitoso, setRegistroExitoso] = useState(false); // Controla si se completó el registro

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const manejarRegistro = async () => {
    if (datosFormulario.password !== datosFormulario.confirmarPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true); // Activa el estado de carga

    try {
      const response = await api.post("/registrarse/sinodal", {
        nombre: datosFormulario.nombre,
        apellidoPaterno: datosFormulario.apellidoPaterno,
        apellidoMaterno: datosFormulario.apellidoMaterno,
        boleta: datosFormulario.boleta,
        correoElectronico: datosFormulario.correo,
        contrasena: datosFormulario.password,
        academia: datosFormulario.academia,
      });

      if (response.status === 200 || response.status === 201) {
        setRegistroExitoso(true); // Indicar que el registro fue exitoso
      } else {
        alert("Hubo un problema al registrar. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error.message);
      alert("Hubo un error al registrar. Intenta de nuevo.");
    } finally {
      setIsLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <div className="body-background d-flex flex-column justify-content-center align-items-center">
      {!registroExitoso ? (
        <div className="card p-4" style={{ maxWidth: "800px", width: "100%" }}>
          <h1 className="text-center mb-4">Registro de Sinodal</h1>
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
              <select
                className="form-control mb-3"
                name="academia"
                value={datosFormulario.academia}
                onChange={manejarCambio}
              >
                <option value="" disabled>
                  Selecciona una academia
                </option>
                <option value="ACC">Academia de Ciencias de la Computación - ACC</option>
                <option value="ACS">Academia de Ciencias Sociales - ACS</option>
                <option value="IA">Academia de Inteligencia Artificial - IA</option>
              </select>
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={manejarRegistro}
                disabled={isLoading} // Desactiva el botón mientras carga
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
            Gracias por tu registro. Por favor, revisa tu correo electrónico para confirmar tu
            cuenta.
          </h2>
          <p className="text-muted">Ya puedes cerrar esta pestaña.</p>
        </div>
      )}
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: "150px" }} />
    </div>
  );
}

export default RegistroSinodal;
