import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Importamos Axios configurado
import '../recursos/estilos/custom.css';
import logo from '../recursos/imagenes/logoESCOM.png';

function InicioSesion() {
  const [boleta, setBoleta] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const manejarInicioSesion = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { boleta, password }); // Llamada a la API
      if (response.data.success) {
        const tipoUsuario = response.data.tipoUsuario; // "Alumno", "Sinodal", "Director"
        switch (tipoUsuario) {
          case 'Alumno':
            navigate('/registro-protocolo');
            break;
          case 'Sinodal':
            navigate('/correcciones');
            break;
          case 'Director':
            navigate('/estado-protocolo');
            break;
          default:
            alert('Tipo de usuario desconocido');
        }
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="body-background">
      <div className="card">
        <h1>Inicio de Sesión</h1>
        <form onSubmit={manejarInicioSesion}>
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
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
        <div className="text-center mt-3">
          <p>¿Olvidaste tu contraseña? <a href="/recuperar-contrasena">Recupérala aquí</a></p>
          <p>¿No tienes una cuenta? <a href="/registro">Regístrate</a></p>
        </div>
      </div>
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: '150px' }} />
    </div>
  );
}

export default InicioSesion;
