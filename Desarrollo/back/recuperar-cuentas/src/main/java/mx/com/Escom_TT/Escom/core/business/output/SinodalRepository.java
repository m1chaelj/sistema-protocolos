package mx.com.Escom_TT.Escom.core.business.output;

import mx.com.Escom_TT.Escom.core.entity.Sinodal;

import java.util.Optional;

public interface SinodalRepository {

    Optional<Sinodal> findByBoleta(Integer boleta);


}
