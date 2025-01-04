import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
//INICIOS DE SESION 
import InicioSesion from '../paginas/InicioSesion/InicioSesion';
import InicioSesionAlumno from '../paginas/InicioSesion/InicioSesionAlumno';
import InicioSesionSinodal from '../paginas/InicioSesion/InicioSesionSinodal';
import InicioSesionSecretario from '../paginas/InicioSesion/InicioSesionSecretario';
//REGISTROS USUARIOS
import RegistroSelector from '../paginas/Registro/RegistroSelector'; 
import RegistroEstudiante from '../paginas/Registro/RegistroEstudiante'; 
import RegistroSinodal from '../paginas/Registro/RegistroSinodal'; 
import RegistroDirector from '../paginas/Registro/RegistroDirector'; 
//RECUPERAR CONTRASENA
import RecuperarContrasena from '../paginas/Registro/RecuperarContrasena';
//PAGINAS ALUMNO
import FormularioUnoDatos from '../paginas/Alumno/FormularioUnoDatos';
import FormularioUnoArchivo from '../paginas/Alumno/FormularioUnoArchivo';
import FormularioDosIntegrantes from '../paginas/Alumno/FormularioDosIntegrantes';
import EstadoProtocolo from '../paginas/Alumno/EstadoProtocolo'; // Asegúrate de tener este componente
import CorreccionProtocolo from '../paginas/Alumno/CorreccionProtocolo'; // Asegúrate de tener este componente
import InicioAlumno from '../paginas/Alumno/InicioAlumno';
//PAGINAS SECRETARIO
import InicioSecretario from '../paginas/Secretario/InicioSecretario';
import DistribucionAcademias from '../paginas/Secretario/DistribucionAcademias';
import RecepcionEvaluaciones from '../paginas/Secretario/RecepcionEvaluaciones';
//PAGINAS SINODAL
import InicioSinodal from '../paginas/Sinodal/InicioSinodal';
import ProtocolosAsignados from '../paginas/Sinodal/ProtocolosAsignados';

const RutasAplicacion = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" />} /> 
      {/*Rutas para inicio */}
      <Route path="/inicio" element={<InicioSesion />} />
      <Route path="/inicio/alumno" element={<InicioSesionAlumno />} />
      <Route path="/inicio/sinodal" element={<InicioSesionSinodal />} />
      <Route path="/inicio/secretario" element={<InicioSesionSecretario />} />
      {/*Rutas para el registro */}
      <Route path="/registro" element={<RegistroSelector />} />
      <Route path="/registro/estudiante" element={<RegistroEstudiante />} />
      <Route path="/registro/sinodal" element={<RegistroSinodal />} />
      <Route path="/registro/secretario" element={<RegistroDirector />} />
      {/*Rutas para recuperar contrasena */}
      <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
      {/* Nuevas rutas para el alumno */}
      <Route path="/alumno/formulario-uno-datos" element={<FormularioUnoDatos />} />
      <Route path="/alumno/formulario-uno-archivo" element={<FormularioUnoArchivo />} />
      <Route path="/alumno/formulario-dos-integrantes" element={<FormularioDosIntegrantes />} />
      <Route path="/alumno/estado-protocolo" element={<EstadoProtocolo />} />
      <Route path="/alumno/correccion-protocolo" element={<CorreccionProtocolo />} />
      <Route path="/alumno/pagina-inicio" element = {<InicioAlumno/>} />
      {/* Nuevas rutas para el secretario */}
      <Route path="/secretario/pagina-inicio" element = {<InicioSecretario/>} />
      <Route path="/secretario/distribucion-academias" element = {<DistribucionAcademias/>} />
      <Route path="/secretario/recepcion-evaluaciones" element = {<RecepcionEvaluaciones/>} />
      {/* Nuevas rutas para el secretario */}
      <Route path="/sinodal/pagina-inicio" element = {<InicioSinodal/>} />
      <Route path="/sinodal/protocolos-asignados" element = {<ProtocolosAsignados/>} />
    </Routes>
  );
};

export default RutasAplicacion;