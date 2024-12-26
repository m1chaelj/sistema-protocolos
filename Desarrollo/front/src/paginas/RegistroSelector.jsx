import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../recursos/imagenes/logoESCOM.png';

function RegistroSelector() {
  const [perfil, setPerfil] = useState('Estudiante');
  const navigate = useNavigate();

  const manejarSeleccion = () => {
    switch (perfil) {
      case 'Estudiante':
        navigate('/registro/estudiante');
        break;
      case 'Sinodal':
        navigate('/registro/sinodal');
        break;
      case 'Director':
        navigate('/registro/director');
        break;
      default:
        alert('Por favor selecciona un perfil válido.');
    }
  };

  return (
    <div className="body-background d-flex flex-column justify-content-center align-items-center">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Selecciona tu Perfil</h1>
        <select
          className="form-control mb-3"
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
        >
          <option value="Estudiante">Estudiante</option>
          <option value="Sinodal">Sinodal</option>
          <option value="Director">Director</option>
        </select>
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={manejarSeleccion}
        >
          Continuar
        </button>
      </div>
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: '150px' }} />
    </div>
  );
}

export default RegistroSelector;
