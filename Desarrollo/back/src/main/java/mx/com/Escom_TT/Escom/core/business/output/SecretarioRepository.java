package mx.com.Escom_TT.Escom.core.business.output;

import mx.com.Escom_TT.Escom.core.entity.Alumno;
import mx.com.Escom_TT.Escom.core.entity.Secretario;

public interface SecretarioRepository {

    Secretario save(Secretario secretario);
    boolean validarExisteBoletaSecretario(Integer boleta);

}
