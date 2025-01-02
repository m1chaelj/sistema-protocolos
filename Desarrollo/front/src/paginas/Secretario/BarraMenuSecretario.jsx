import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../recursos/estilos/custom.css';
import menuIcon from '../../recursos/imagenes/menu-icon.png'; // Icono del menú

function BarraMenuSecretario() {
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
            <Link to="/secretario/distribucion-academias">Distribucion Academias</Link>
          </li>
          <li>
            <Link to="/secretario/recepcion-evaluaciones">Recepcion de Evaluaciones</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BarraMenuSecretario;
