package mx.com.Escom_TT.Escom.core.business.input;

import mx.com.Escom_TT.Escom.core.entity.Protocolo;

import java.util.List;
import java.util.Optional;

public interface ProtocoloService {
    Optional<Protocolo> BuscarAcademia(String academia);
}
