import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../recursos/estilos/custom.css";
import advertenciaIcono from "../../recursos/imagenes/advertencia.png";
import logo from "../../recursos/imagenes/logoESCOM.png";

function FormularioDosIntegrantes() {
  const [integrantes, setIntegrantes] = useState(0);
  const [listaIntegrantes, setListaIntegrantes] = useState([]);
  const navigate = useNavigate();

  const manejarCambioIntegrantes = (e) => {
    const cantidad = parseInt(e.target.value, 10);
    setIntegrantes(cantidad);
    const nuevaLista = [];
    for (let i = 0; i < cantidad; i++) {
      nuevaLista.push({ nombre: "", boleta: "" });
    }
    setListaIntegrantes(nuevaLista);
  };

  const manejarCambioIntegrante = (indice, campo, valor) => {
    setListaIntegrantes((prevLista) => {
      const nuevaLista = [...prevLista];
      nuevaLista[indice][campo] = valor;
      return nuevaLista;
    });
  };

  const registrarIntegrantes = async () => {
    if (
      window.confirm(
        `<div class="advertencia"> 
           <img src="${advertenciaIcono}" alt="Icono de advertencia" /> 
           <span>ADVERTENCIA</span>
         </div> 
         <p>Al proceder, los datos ya cargados serán enviados y podrían no ser reversibles.</p>
         <p>¿Estás seguro de que quieres continuar?</p>`
      )
    ) {
      try {
        const response = await api.post("/protocolos/integrantes", {
          integrantes: listaIntegrantes,
        });
        console.log(response); // Verifica la respuesta de la API

        // Redirigir al siguiente paso (estado del protocolo)
        navigate("/alumno/estado-protocolo");
      } catch (error) {
        console.error("Error al registrar los integrantes:", error);
        alert("Error al registrar los integrantes. Intenta de nuevo.");
      }
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
              <option value={3}>Tres</option>
            </select>
          </div>
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
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={registrarIntegrantes}
          >
            Registrar integrantes
          </button>
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

export default FormularioDosIntegrantes;