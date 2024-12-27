import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../recursos/estilos/custom.css';
import logo from '../../recursos/imagenes/logoESCOM.png';

function InicioSesionSinodal() {
  const [boleta, setBoleta] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const manejarInicioSesion = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/sinodal', { boleta, password }); 
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('rol', 'sinodal');
        navigate('//pagina-principal-sinodal'); 
      } else {
        // Mostrar el mensaje de error de la API si existe, de lo contrario un mensaje genérico
        alert(response.data.message || 'Credenciales incorrectas.'); 
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <div className="body-background">
      <div className="card">
        <h1>Inicio de Sesión - Sinodal</h1>
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

export default InicioSesionSinodal;