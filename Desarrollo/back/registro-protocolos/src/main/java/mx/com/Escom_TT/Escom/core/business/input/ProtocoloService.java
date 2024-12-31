package mx.com.Escom_TT.Escom.core.business.input;

import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import java.util.List;
import java.util.Optional;

public interface ProtocoloService {
    Either<ErrorCodesEnum, Protocolo> create(Protocolo entity);
    List<Protocolo> findByNombreProtocolo(String nombre);

    }
