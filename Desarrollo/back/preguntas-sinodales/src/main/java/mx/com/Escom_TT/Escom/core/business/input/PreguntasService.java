package mx.com.Escom_TT.Escom.core.business.input;

import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.entity.Preguntas;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

public interface PreguntasService {

Either<ErrorCodesEnum,Preguntas> crearPreguntas(Preguntas entity);
}
