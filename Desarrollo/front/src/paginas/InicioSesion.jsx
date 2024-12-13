import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../recursos/imagenes/logoESCOM.png';

const InicioSesion = () => {
  return (
    <div className="body-background d-flex flex-column justify-content-center align-items-center">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Inicio de sesión</h1>
        <form>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Ingresa tu boleta" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Ingresa tu contraseña" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/recuperar-contrasena" className="d-block">¿Olvidaste tu contraseña?</Link>
          <Link to="/registro" className="d-block">¿No tienes una cuenta? Regístrate</Link>
        </div>
      </div>
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: '150px' }} />
    </div>
  );
};

export default InicioSesion;
