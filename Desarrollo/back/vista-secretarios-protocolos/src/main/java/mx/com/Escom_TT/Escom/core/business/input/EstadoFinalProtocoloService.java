package mx.com.Escom_TT.Escom.core.business.input;

import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.entity.EstadoFinalProtocolo;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

public interface EstadoFinalProtocoloService {

    Either<ErrorCodesEnum, EstadoFinalProtocolo> create(EstadoFinalProtocolo entity);

}
