import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InicioSesion from '../paginas/InicioSesion';
import Registro from '../paginas/Registro';
import RecuperarContrasena from '../paginas/RecuperarContrasena';
import RegistroProtocolo from '../paginas/RegistroProtocolo';


const RutasAplicacion = () => {
  return (
    <Routes>
      <Route path="/" element={<InicioSesion />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
      <Route path="/registro-protocolo" element={<RegistroProtocolo />} /> {/* Ruta corregida */}
    </Routes>
  );
};

export default RutasAplicacion;

