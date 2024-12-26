import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Importa el cliente Axios
import logo from '../recursos/imagenes/logoESCOM.png';

function Registro() {
  const [tipoPerfil, setTipoPerfil] = useState('Estudiante');
  const [boleta, setBoleta] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    boleta: '',
    correo: '',
    password: '',
    confirmarPassword: '',
    academia: '',
  });
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const manejarContinuar = () => {
    if (boleta.trim() === '') {
      alert('Por favor, ingresa un número de boleta válido.');
      return;
    }
    setDatosFormulario({ ...datosFormulario, boleta });
    setMostrarFormulario(true);
  };

  const manejarRegistro = async () => {
    if (datosFormulario.password !== datosFormulario.confirmarPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await api.post('/registrarse/estudiante', {
        tipoPerfil,
        nombre: datosFormulario.nombre,
        apellidoPaterno: datosFormulario.apellidoPaterno,
        apellidoMaterno: datosFormulario.apellidoMaterno,
        correoElectronico: datosFormulario.correo,
        boleta: datosFormulario.boleta,
        contrasena: datosFormulario.password,
      });

      if (response.status === 200 || response.status === 201) {
        alert('Registro exitoso');
        navigate('/inicio-sesion');
      } else {
        alert('Hubo un problema al registrar. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error en el registro:', error.response?.data || error.message);
      alert('Hubo un error al registrar. Intenta de nuevo.');
    }
  };

  return (
    <div className="body-background d-flex flex-column justify-content-center align-items-center">
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
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Nombre"
                name="nombre"
                value={datosFormulario.nombre}
                onChange={manejarCambio}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Apellido paterno"
                name="apellidoPaterno"
                value={datosFormulario.apellidoPaterno}
                onChange={manejarCambio}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Apellido materno"
                name="apellidoMaterno"
                value={datosFormulario.apellidoMaterno}
                onChange={manejarCambio}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Número de boleta"
                name="boleta"
                value={boleta}
                disabled
              />
            </div>
            <div className="col-md-6">
              {tipoPerfil === 'Sinodal' && (
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Academia"
                  name="academia"
                  value={datosFormulario.academia}
                  onChange={manejarCambio}
                />
              )}
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Correo electrónico"
                name="correo"
                value={datosFormulario.correo}
                onChange={manejarCambio}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Contraseña"
                name="password"
                value={datosFormulario.password}
                onChange={manejarCambio}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirmar contraseña"
                name="confirmarPassword"
                value={datosFormulario.confirmarPassword}
                onChange={manejarCambio}
              />
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
