import React from 'react';
import logo from '../recursos/imagenes/logoESCOM.png';

function Registro() {
  return (
    <div className="body-background d-flex flex-column justify-content-center align-items-center">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Regístrate</h1>
        <form>
          <div className="mb-3">
            <select className="form-select">
              <option>Estudiante</option>
              <option>Sinodal</option>
              <option>Director</option>
            </select>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Número de boleta" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Continuar</button>
        </form>
      </div>
      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: '150px' }} />
    </div>
  );
}

export default Registro;
