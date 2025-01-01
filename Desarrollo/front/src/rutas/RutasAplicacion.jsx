import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import InicioSesion from '../paginas/InicioSesion/InicioSesion';
import InicioSesionAlumno from '../paginas/InicioSesion/InicioSesionAlumno';
import InicioSesionSinodal from '../paginas/InicioSesion/InicioSesionSinodal';
import InicioSesionSecretario from '../paginas/InicioSesion/InicioSesionSecretario';

import RegistroSelector from '../paginas/Registro/RegistroSelector'; 
import RegistroEstudiante from '../paginas/Registro/RegistroEstudiante'; 
import RegistroSinodal from '../paginas/Registro/RegistroSinodal'; 
import RegistroDirector from '../paginas/Registro/RegistroDirector'; 

import RecuperarContrasena from '../paginas/Registro/RecuperarContrasena';

import FormularioUnoDatos from '../paginas/Alumno/FormularioUnoDatos';
import FormularioUnoArchivo from '../paginas/Alumno/FormularioUnoArchivo';
import FormularioDosIntegrantes from '../paginas/Alumno/FormularioDosIntegrantes';
import EstadoProtocolo from '../paginas/Alumno/EstadoProtocolo'; // Asegúrate de tener este componente
import CorreccionProtocolo from '../paginas/Alumno/CorreccionProtocolo'; // Asegúrate de tener este componente
import InicioAlumno from '../paginas/Alumno/InicioAlumno';

const RutasAplicacion = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" />} /> 
      <Route path="/inicio" element={<InicioSesion />} />
      <Route path="/inicio/alumno" element={<InicioSesionAlumno />} />
      <Route path="/inicio/sinodal" element={<InicioSesionSinodal />} />
      <Route path="/inicio/secretario" element={<InicioSesionSecretario />} />
      <Route path="/registro" element={<RegistroSelector />} />
      <Route path="/registro/estudiante" element={<RegistroEstudiante />} />
      <Route path="/registro/sinodal" element={<RegistroSinodal />} />
      <Route path="/registro/secretario" element={<RegistroDirector />} />
      <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />

      {/* Nuevas rutas para el alumno */}
      <Route path="/alumno/formulario-uno-datos" element={<FormularioUnoDatos />} />
      <Route path="alumno/formulario-uno-archivo" element={<FormularioUnoArchivo />} />
      <Route path="/alumno/formulario-dos-integrantes" element={<FormularioDosIntegrantes />} />
      <Route path="/alumno/estado-protocolo" element={<EstadoProtocolo />} />
      <Route path="/alumno/correccion-protocolo" element={<CorreccionProtocolo />} />
      <Route path="/alumno/pagina-inicio" element = {<InicioAlumno/>} />
    </Routes>
  );
};

export default RutasAplicacion;