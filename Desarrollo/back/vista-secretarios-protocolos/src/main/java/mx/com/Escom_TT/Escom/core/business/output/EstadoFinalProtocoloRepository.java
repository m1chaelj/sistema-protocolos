package mx.com.Escom_TT.Escom.core.business.output;

import mx.com.Escom_TT.Escom.core.entity.EstadoFinalProtocolo;

import java.util.Optional;

public interface EstadoFinalProtocoloRepository {
    EstadoFinalProtocolo save(EstadoFinalProtocolo estadofProtocolo);
    Optional<EstadoFinalProtocolo> findFirstAvailable();
}