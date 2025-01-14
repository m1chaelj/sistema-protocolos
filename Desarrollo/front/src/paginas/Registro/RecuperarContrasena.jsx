import React, { useState } from "react";
import api from "../../api/api8083";
import logo from "../../recursos/imagenes/logoESCOM.png";

function RecuperarContrasena() {
  const [boleta, setBoleta] = useState("");
  const [rol, setRol] = useState(""); // Para seleccionar el rol del usuario
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [mensaje, setMensaje] = useState(""); // Mensaje de éxito o error

  const manejarCambioBoleta = (e) => {
    setBoleta(e.target.value);
  };

  const manejarCambioRol = (e) => {
    setRol(e.target.value);
  };

  const recuperarContrasena = async () => {
    if (!boleta || !rol) {
      alert("Por favor, ingresa la boleta y selecciona un rol.");
      return;
    }

    setIsLoading(true);
    setMensaje("");

    try {
      const response = await api.post(`/${rol}/recuperar/${boleta}`);
      if (response.status === 200) {
        setMensaje("Correo de recuperación enviado exitosamente. Revisa tu bandeja.");
      } else {
        setMensaje("No se pudo enviar el correo de recuperación. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al recuperar la contraseña:", error.response?.data || error.message);
      setMensaje("Ocurrió un error. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
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
        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      </div>
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: "150px" }} />
    </div>
  );
}

export default RecuperarContrasena;
