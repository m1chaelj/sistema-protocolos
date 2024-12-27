import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InicioSesion from '../paginas/InicioSesion/InicioSesion';
import InicioSesionAlumno from '../paginas/InicioSesion/InicioSesionAlumno';
import InicioSesionSinodal from '../paginas/InicioSesion/InicioSesionSinodal';
import InicioSesionSecretario from '../paginas/InicioSesion/InicioSesionSecretario';

import RegistroSelector from '../paginas/Registro/RegistroSelector'; // Selección de perfil
import RegistroEstudiante from '../paginas/Registro/RegistroEstudiante'; // Registro de estudiante
import RegistroSinodal from '../paginas/Registro/RegistroSinodal'; // Registro de sinodal
import RegistroDirector from '../paginas/Registro/RegistroDirector'; // Registro de director

import RecuperarContrasena from '../paginas/Registro/RecuperarContrasena';

import RegistroProtocolo from '../paginas/Alumno/RegistroProtocolo';
import { Navigate } from 'react-router-dom';

const RutasAplicacion = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" />} /> {/* Redirección automática */}
      <Route path="/inicio" element={<InicioSesion />} />
      <Route path="/alumno" element={<InicioSesionAlumno />} />
      <Route path="/sinodal" element={<InicioSesionSinodal />} />
      <Route path="/secretario" element={<InicioSesionSecretario />} />
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