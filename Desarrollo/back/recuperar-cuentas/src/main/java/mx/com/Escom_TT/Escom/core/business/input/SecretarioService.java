package mx.com.Escom_TT.Escom.core.business.input;

import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.entity.Secretario;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

public interface SecretarioService {
    Either<ErrorCodesEnum, Secretario> recuperar(Integer boleta);
}
