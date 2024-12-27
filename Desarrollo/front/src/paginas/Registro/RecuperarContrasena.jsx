import React from 'react';
import logo from '../../recursos/imagenes/logoESCOM.png';

function RecuperarContrasena() {
  return (
    <div className="body-background d-flex flex-column justify-content-center align-items-center">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Olvidaste tu contraseña</h1>
        <form>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Correo" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Recuperar contraseña</button>
        </form>
      </div>
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: '150px' }} />
    </div>
  );
}

export default RecuperarContrasena;
