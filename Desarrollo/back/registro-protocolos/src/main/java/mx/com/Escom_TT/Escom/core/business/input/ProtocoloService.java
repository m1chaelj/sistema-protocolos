package mx.com.Escom_TT.Escom.core.business.input;

import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

public interface ProtocoloService {
    Either<ErrorCodesEnum, Protocolo> create(Protocolo entity);

}
