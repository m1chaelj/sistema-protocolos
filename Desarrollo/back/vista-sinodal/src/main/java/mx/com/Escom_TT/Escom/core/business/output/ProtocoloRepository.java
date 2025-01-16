package mx.com.Escom_TT.Escom.core.business.output;

import mx.com.Escom_TT.Escom.core.entity.Protocolo;

import java.util.List;
import java.util.Optional;

public interface ProtocoloRepository {


   List<Protocolo> BuscarAcademia(String academia);

}
