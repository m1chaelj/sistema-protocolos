import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../recursos/estilos/custom.css';
import menuIcon from '../recursos/imagenes/menu-icon.png'; // Icono del menú

function BarraMenu() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const alternarMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <div className={`barra-menu ${menuAbierto ? 'menu-abierto' : ''}`}>
      {/* Icono de menú */}
      <div className="menu-icon" onClick={alternarMenu}>
        <img src={menuIcon} alt="Menú" />
      </div>

      {/* Contenido del menú */}
      <nav className={`menu-contenido ${menuAbierto ? 'mostrar' : ''}`}>
        <ul>
          <li>
            <Link to="/registro-protocolo">Registro del Protocolo</Link>
          </li>
          <li>
            <Link to="/estado-protocolo">Estado del Protocolo</Link>
          </li>
          <li>
            <Link to="/correccion-protocolo">Corrección de Protocolo</Link>
          </li>
          <li className="cerrar-sesion">
            <Link to="/">Cerrar Sesión</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BarraMenu;
