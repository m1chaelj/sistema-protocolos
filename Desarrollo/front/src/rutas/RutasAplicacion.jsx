import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InicioSesion from '../paginas/InicioSesion';
import RegistroSelector from '../paginas/RegistroSelector'; // Selección de perfil
import RegistroEstudiante from '../paginas/RegistroEstudiante'; // Registro de estudiante
import RegistroSinodal from '../paginas/RegistroSinodal'; // Registro de sinodal
import RegistroDirector from '../paginas/RegistroDirector'; // Registro de director
import RecuperarContrasena from '../paginas/RecuperarContrasena';
import RegistroProtocolo from '../paginas/RegistroProtocolo';

const RutasAplicacion = () => {
  return (
    <Routes>
      <Route path="/" element={<InicioSesion />} />
      <Route path="/registro" element={<RegistroSelector />} /> {/* Selector de perfil */}
      <Route path="/registro/estudiante" element={<RegistroEstudiante />} /> {/* Formulario para estudiante */}
      <Route path="/registro/sinodal" element={<RegistroSinodal />} /> {/* Formulario para sinodal */}
      <Route path="/registro/director" element={<RegistroDirector />} /> {/* Formulario para director */}
      <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
      <Route path="/registro-protocolo" element={<RegistroProtocolo />} />
    </Routes>
  );
};

export default RutasAplicacion;

