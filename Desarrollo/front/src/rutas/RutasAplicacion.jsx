import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InicioSesion from '../paginas/InicioSesion';
import RegistroSelector from '../paginas/RegistroSelector'; // Selección de perfil
import RegistroEstudiante from '../paginas/RegistroEstudiante'; // Registro de estudiante
import RegistroSinodal from '../paginas/RegistroSinodal'; // Registro de sinodal
import RegistroDirector from '../paginas/RegistroDirector'; // Registro de director
import RecuperarContrasena from '../paginas/RecuperarContrasena';
import RegistroProtocolo from '../paginas/RegistroProtocolo';
import { Navigate } from 'react-router-dom';

const RutasAplicacion = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" />} /> {/* Redirección automática */}
      <Route path="/inicio" element={<InicioSesion />} />
      <Route path="/registro" element={<RegistroSelector />} />
      <Route path="/registro/estudiante" element={<RegistroEstudiante />} />
      <Route path="/registro/sinodal" element={<RegistroSinodal />} />
      <Route path="/registro/secretario" element={<RegistroDirector />} />
      <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
      <Route path="/registro-protocolo" element={<RegistroProtocolo />} />
    </Routes>
  );
};

export default RutasAplicacion;

