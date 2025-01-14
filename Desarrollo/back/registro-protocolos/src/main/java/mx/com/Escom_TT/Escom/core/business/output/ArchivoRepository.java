package mx.com.Escom_TT.Escom.core.business.output;

import mx.com.Escom_TT.Escom.core.entity.Archivo;

import java.util.Optional;

public interface ArchivoRepository {
    Archivo save(Archivo archivo);
    Archivo update(Archivo archivo);
    Optional<Archivo> existe(String fileName);
}
