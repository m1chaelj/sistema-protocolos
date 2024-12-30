package mx.com.Escom_TT.Escom.core.business.input;

import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.entity.Integrante;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

public interface IntegranteService {

    Either<ErrorCodesEnum, Integrante> create(Integrante entity);
}
