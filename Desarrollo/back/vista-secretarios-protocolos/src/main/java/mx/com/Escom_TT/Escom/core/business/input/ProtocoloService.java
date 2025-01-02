package mx.com.Escom_TT.Escom.core.business.input;

import mx.com.Escom_TT.Escom.core.entity.Protocolo;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;

import java.util.List;
import java.util.Optional;

public interface ProtocoloService {
    List<Protocolo> busquedaTodosProtocolos();
    List <Sinodal> busquedaSinodalesAcademia(String academia);

}
