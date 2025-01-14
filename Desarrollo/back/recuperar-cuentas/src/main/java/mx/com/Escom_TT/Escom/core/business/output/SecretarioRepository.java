package mx.com.Escom_TT.Escom.core.business.output;

import mx.com.Escom_TT.Escom.core.entity.Secretario;

import java.util.Optional;

public interface SecretarioRepository {
    Optional<Secretario> findByBoleta(Integer boleta);

}
