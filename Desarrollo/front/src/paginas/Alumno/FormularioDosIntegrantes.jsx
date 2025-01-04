import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api8081";
import "../../recursos/estilos/custom.css";
import logo from "../../recursos/imagenes/logoESCOM.png";

function FormularioDosIntegrantes() {
  const [integrantes, setIntegrantes] = useState(0);
  const [listaIntegrantes, setListaIntegrantes] = useState([
    { nombre: "", boleta: "" },
    { nombre: "", boleta: "" },
  ]); // Siempre dos integrantes para mapeo
  const navigate = useNavigate();

  // Manejar cambio en los campos dinámicos
  const manejarCambioIntegrante = (indice, campo, valor) => {
    setListaIntegrantes((prevLista) => {
      const nuevaLista = [...prevLista];
      nuevaLista[indice][campo] = valor;
      return nuevaLista;
    });
  };

  // Enviar datos al backend en el formato correcto
  const confirmarRegistro = async () => {
    const [integrante1, integrante2] = listaIntegrantes;

    if (integrantes === 0) {
      alert("No hay integrantes secundarios que registrar.");
      navigate("/alumno/pagina-inicio", { replace: true });
      return;
    }

    if (!integrante1.nombre || !integrante1.boleta) {
      alert("Por favor, completa los datos del primer integrante.");
      return;
    }

    if (integrantes === 2 && (!integrante2.nombre || !integrante2.boleta)) {
      alert("Por favor, completa los datos del segundo integrante.");
      return;
    }

    const payload = {
      nombre: integrante1.nombre,
      boleta: parseInt(integrante1.boleta, 10),
      nombreSegundoIntegrante: integrantes === 2 ? integrante2.nombre : null,
      boletaSegundoIntegrante: integrantes === 2 ? parseInt(integrante2.boleta, 10) : null,
    };

    try {
      const response = await api.post("/registro-protocolo/integrantes", payload);

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

          {/* Botón de confirmar y registrar */}
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
    </div>
  );
}

export default FormularioDosIntegrantes;
