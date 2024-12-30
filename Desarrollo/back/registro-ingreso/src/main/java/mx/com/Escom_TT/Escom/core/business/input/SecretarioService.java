package mx.com.Escom_TT.Escom.core.business.input;

import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.entity.Alumno;
import mx.com.Escom_TT.Escom.core.entity.Secretario;
import mx.com.Escom_TT.Escom.core.entity.SecretarioSession;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

public interface SecretarioService {
    Either<ErrorCodesEnum, Secretario> create(Secretario entity);
    Either<ErrorCodesEnum, SecretarioSession> InicioSesion(Secretario entity);


}
