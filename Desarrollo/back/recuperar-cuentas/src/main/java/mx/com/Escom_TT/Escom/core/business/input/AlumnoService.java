package mx.com.Escom_TT.Escom.core.business.input;

import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.entity.Alumno;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

public interface AlumnoService {
    Either<ErrorCodesEnum, Alumno> recuperar(Integer boleta);
}
