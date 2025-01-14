import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../recursos/estilos/custom.css';
import logo from '../../recursos/imagenes/logoESCOM.png';
import { Modal, Button } from 'react-bootstrap';

function InicioSesionSecretario() {
  const [boleta, setBoleta] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('warning');
  const navigate = useNavigate();

  const manejarInicioSesion = async (e) => {
    e.preventDefault();

    // Validaciones de campos vacíos
    if (!boleta.trim() && !password.trim()) {
      setModalMessage('Por favor, ingresa tu número de boleta y contraseña.');
      setModalType('warning');
      setShowModal(true);
      return;
    }
    if (!boleta.trim()) {
      setModalMessage('Por favor, ingresa tu número de boleta.');
      setModalType('warning');
      setShowModal(true);
      return;
    }
    if (!password.trim()) {
      setModalMessage('Por favor, ingresa tu contraseña.');
      setModalType('warning');
      setShowModal(true);
      return;
    }

    try {
      const response = await api.post('/inicio/secretario', {
        boleta,
        contrasena: password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('rol', 'secretario');
        navigate('/secretario/pagina-inicio');
      } else {
        setModalMessage(response.data.message || 'Credenciales incorrectas. Por favor, verifica e intenta de nuevo.');
        setModalType('warning');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setModalMessage('Hubo un problema con el servidor. Por favor, intenta más tarde.');
      setModalType('danger');
      setShowModal(true);
    }
  };

  return (
    <div className="body-background">
      <div className="card shadow-lg p-4">
        <h1 className="text-center mb-4">Inicio de Sesión - Secretario</h1>
        <form onSubmit={manejarInicioSesion}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Número de boleta"
            name="boleta"
            value={boleta}
            onChange={(e) => setBoleta(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Contraseña"
            name="contrasena"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>

        {/* Enlaces de recuperación y registro */}
        <div className="text-center mt-3">
          <p>
            ¿Olvidaste tu contraseña?{' '}
            <a href="/recuperar-contrasena" className="text-primary">
              Recupérala aquí
            </a>
          </p>
          <p>
            ¿No tienes una cuenta?{' '}
            <a href="/registro" className="text-primary">
              Regístrate
            </a>
          </p>
        </div>
      </div>

      <img src={logo} alt="Logo ESCOM" className="mt-4" style={{ width: '150px' }} />

      {/* Modal para mostrar mensajes */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'warning' ? 'Advertencia' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InicioSesionSecretario;
