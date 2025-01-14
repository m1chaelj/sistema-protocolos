package mx.com.Escom_TT.Escom.core.business.input;

import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.entity.Archivo;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import java.io.InputStream;

public interface ArchivoService {
    Either<ErrorCodesEnum, Archivo> uploadFile(String fileName, InputStream inputStream,Archivo entity);
    Either<ErrorCodesEnum, Archivo> updateFile(String fileName,  Archivo entity);
}
