import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../recursos/estilos/custom.css';
import logo from '../../recursos/imagenes/logoESCOM.png';

function InicioSesion() {
  const [tipoUsuario, setTipoUsuario] = useState(''); // Estado inicial vacío para la opción neutral
  const navigate = useNavigate();

  const manejarCambioUsuario = (e) => {
    const tipo = e.target.value;
    setTipoUsuario(tipo);
    switch (tipo) {
      case 'Alumno':
        navigate('/inicio/alumno');
        break;
      case 'Sinodal':
        navigate('/inicio/sinodal');
        break;
      case 'Secretario':
        navigate('/inicio/secretario');
        break;
      default:
        break;
    }
  };

  return (
    <div className="body-background">
      <div className="card">
        <h1>Inicio de Sesión</h1>
        <label htmlFor="tipoUsuario" className="form-label">Selecciona perfil para iniciar sesión</label>
        <select
          id="tipoUsuario"
          className="form-control mb-3"
          value={tipoUsuario}
          onChange={manejarCambioUsuario}
        >
          <option value="">Selecciona un perfil</option> {/* Opción neutral */}
          <option value="Alumno">Alumno</option>
          <option value="Sinodal">Sinodal</option>
          <option value="Secretario">Secretario</option>
        </select>
      </div>
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: '150px' }} />
    </div>
  );
}

export default InicioSesion;