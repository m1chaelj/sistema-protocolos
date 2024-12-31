package mx.com.Escom_TT.Escom.core.business.output;

import mx.com.Escom_TT.Escom.core.entity.Protocolo;

import java.util.List;


public interface ProtocoloRepository {

    Protocolo save(Protocolo protocolo);
    boolean existsByNombre(String nombre);
    List<Protocolo> findByNombreProtocolo(String nombre);
}
