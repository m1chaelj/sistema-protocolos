package mx.com.Escom_TT.Escom.core.business.output;

import mx.com.Escom_TT.Escom.core.entity.Alumno;
import mx.com.Escom_TT.Escom.core.entity.Secretario;

import java.util.Optional;

public interface SecretarioRepository {

    Secretario save(Secretario secretario);
    boolean validarExisteBoletaSecretario(Integer boleta);
    boolean verificarInicioSesion(Integer boleta, String contrasena);
    Optional<Secretario> findByBoleta(Integer boleta);


}
