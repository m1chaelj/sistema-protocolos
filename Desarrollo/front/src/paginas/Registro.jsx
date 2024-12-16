import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../recursos/imagenes/logoESCOM.png';
import '../recursos/estilos/custom.css'; // Asegúrate de tener tus estilos personalizados aquí

function Registro() {
  const [tipoPerfil, setTipoPerfil] = useState("Estudiante");
  const [boleta, setBoleta] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [animacionClase, setAnimacionClase] = useState(""); // Clase para animaciones
  const navigate = useNavigate();

  const manejarContinuar = () => {
    if (boleta.trim() === "") {
      alert("Por favor, ingresa un número de boleta válido.");
      return;
    }

    // Añade una clase para animación
    setAnimacionClase("fade-out");
    setTimeout(() => {
      setMostrarFormulario(true);
      setAnimacionClase("fade-in");
    }, 300); // Tiempo de la animación en milisegundos
  };

  const manejarRegistro = () => {
    alert("Registro completado. Aquí deberíamos conectar con el backend.");
    navigate('/inicio-sesion');
  };

  return (
    <div className={`body-background d-flex flex-column justify-content-center align-items-center ${animacionClase}`}>
      {!mostrarFormulario ? (
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
        <div className="card p-4" style={{ maxWidth: '800px', width: '100%' }}>
          <h1 className="text-center mb-4">Regístrate</h1>
          <div className="row">
            <div className="col-md-6">
              <input type="text" className="form-control mb-3" placeholder="Nombre" />
              <input type="text" className="form-control mb-3" placeholder="Apellido paterno" />
              <input type="text" className="form-control mb-3" placeholder="Apellido materno" />
              <input
                type="text"
                className="form-control mb-3"
                value={tipoPerfil}
                disabled
              />
              <input
                type="text"
                className="form-control mb-3"
                value={boleta}
                disabled
              />
            </div>
            <div className="col-md-6">
              <input type="email" className="form-control mb-3" placeholder="Correo electrónico" />
              <input type="password" className="form-control mb-3" placeholder="Contraseña" />
              <input type="password" className="form-control mb-3" placeholder="Confirmar contraseña" />
              <input type="text" className="form-control mb-3" placeholder="Nombre de la carrera" />
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
