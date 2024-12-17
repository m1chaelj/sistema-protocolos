import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../recursos/imagenes/logoESCOM.png';

function Registro() {
  const [tipoPerfil, setTipoPerfil] = useState("Estudiante"); // Tipo de perfil seleccionado
  const [boleta, setBoleta] = useState(""); // Número de boleta
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Alternar vista del formulario
  const navigate = useNavigate();

  // Función para validar y continuar al formulario
  const manejarContinuar = () => {
    if (boleta.trim() === "") {
      alert("Por favor, ingresa un número de boleta válido.");
      return;
    }
    setMostrarFormulario(true);
  };

  // Función de registro (simulación)
  const manejarRegistro = () => {
    alert("Registro completado. Aquí deberíamos conectar con el backend.");
    navigate('/inicio-sesion');
  };

  return (
    <div className="body-background d-flex flex-column justify-content-center align-items-center">
      {!mostrarFormulario ? (
        // Selección de tipo de perfil y boleta
        <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h1 className="text-center mb-4">Regístrate</h1>
          <select
            className="form-control mb-3"
            value={tipoPerfil}
            onChange={(e) => setTipoPerfil(e.target.value)}
          >
            <option value="Estudiante">Estudiante</option>
            <option value="Sinodal">Sinodal</option>
            <option value="Director">Director</option>
          </select>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Ingresa número de boleta"
            value={boleta}
            onChange={(e) => setBoleta(e.target.value)}
          />
          <button type="button" className="btn btn-primary w-100" onClick={manejarContinuar}>
            Continuar
          </button>
        </div>
      ) : (
        // Formulario dinámico según tipo de perfil
        <div className="card p-4" style={{ maxWidth: '800px', width: '100%' }}>
          <h1 className="text-center mb-4">Regístrate</h1>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Número de boleta"
                value={boleta}
                disabled
              />
              <input type="text" className="form-control mb-3" placeholder="Nombre" />
              <input type="text" className="form-control mb-3" placeholder="Apellido paterno" />
              <input type="text" className="form-control mb-3" placeholder="Apellido materno" />
            </div>
            <div className="col-md-6">
              {/* Condición para tipo de perfil Sinodal */}
              {tipoPerfil === "Sinodal" ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Academia"
                  />
                </>
              ) : null}
              <input type="email" className="form-control mb-3" placeholder="Correo electrónico" />
              <input type="password" className="form-control mb-3" placeholder="Contraseña" />
              <input type="password" className="form-control mb-3" placeholder="Confirmar contraseña" />
              <button type="button" className="btn btn-primary w-100" onClick={manejarRegistro}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: '150px' }} />
    </div>
  );
}

export default Registro;
