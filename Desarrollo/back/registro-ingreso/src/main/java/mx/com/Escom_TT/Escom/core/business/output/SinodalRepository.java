package mx.com.Escom_TT.Escom.core.business.output;

import mx.com.Escom_TT.Escom.core.entity.Secretario;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;

import java.util.Optional;

public interface SinodalRepository {

    Sinodal save (Sinodal sinodal);
    boolean verificarInicioSesion(Integer boleta, String contrasena);
    Optional<Sinodal> findByBoleta(Integer boleta);


}
