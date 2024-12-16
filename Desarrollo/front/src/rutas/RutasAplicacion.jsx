import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InicioSesion from '../paginas/InicioSesion';
import Registro from '../paginas/Registro';
import RecuperarContrasena from '../paginas/RecuperarContrasena';

const RutasAplicacion = () => {
  return (
    <Routes>
      <Route path="/" element={<InicioSesion />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
    </Routes>
  );
};

export default RutasAplicacion;


