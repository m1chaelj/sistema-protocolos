package mx.com.Escom_TT.Escom.core.business.output;

import mx.com.Escom_TT.Escom.core.entity.EstadoFinalProtocolo;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;

import java.util.List;
import java.util.Optional;

public interface ProtocoloRepository {

    List<Protocolo> busquedaTodosProtocolos();
    List <Sinodal> busquedaSinodalesAcademia(String academia);
    List <Protocolo> mostrarProtocolosEvaluados();

}
