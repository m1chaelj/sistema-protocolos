import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Importamos Axios configurado
import '../recursos/estilos/custom.css';
import logo from '../recursos/imagenes/logoESCOM.png';

function Registro() {
  const [tipoPerfil, setTipoPerfil] = useState('Alumno');
  const [boleta, setBoleta] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/registro', {
        tipoPerfil,
        boleta,
        password,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
      });

      if (response.data.success) {
        alert('Registro exitoso');
        navigate('/');
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error al registrarse');
    }
  };

  return (
    <div className="body-background">
      <div className="card">
        <h1>Registro</h1>
        <form onSubmit={manejarRegistro}>
          <select
            className="form-control mb-3"
            value={tipoPerfil}
            onChange={(e) => setTipoPerfil(e.target.value)}
          >
            <option value="Alumno">Alumno</option>
            <option value="Sinodal">Sinodal</option>
            <option value="Director">Director</option>
          </select>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Número de boleta"
            value={boleta}
            onChange={(e) => setBoleta(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Apellido Paterno"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Apellido Materno"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-100">
            Registrar
          </button>
        </form>
      </div>
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: '150px' }} />
    </div>
  );
}

export default Registro;
