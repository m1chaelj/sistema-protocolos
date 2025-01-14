package mx.com.Escom_TT.Escom.core.business.input;

import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.entity.EstadoFinalProtocolo;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import java.util.List;
import java.util.Optional;

public interface ProtocoloService {
    List<Protocolo> busquedaTodosProtocolos();
    List <Sinodal> busquedaSinodalesAcademia(String academia);
    List <Protocolo> mostrarProtocolosEvaluados();

}
