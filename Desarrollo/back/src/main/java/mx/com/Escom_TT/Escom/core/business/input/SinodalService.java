package mx.com.Escom_TT.Escom.core.business.input;

import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.entity.Secretario;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;
import mx.com.Escom_TT.Escom.core.entity.SinodalSession;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

public interface SinodalService {
    Either<ErrorCodesEnum, Sinodal> create(Sinodal entity);
    Either<ErrorCodesEnum, SinodalSession> InicioSesion(Sinodal entity);


}
