package mx.com.Escom_TT.Escom.core.business.output;

import mx.com.Escom_TT.Escom.core.entity.Alumno;

import java.util.Optional;

public interface AlumnoRepository {

    Alumno save(Alumno alumno);
    boolean verificarInicioSesion(Integer boleta, String contrasena);
    Optional<Alumno> findByBoleta(Integer boleta);
}
