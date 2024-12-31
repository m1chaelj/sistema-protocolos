package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.ProtocoloRepository;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;
import mx.com.Escom_TT.Escom.external.jpa.model.ProtocoloJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.ProtocoloJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceUnit;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@ApplicationScoped
public class ProtocoloDao implements ProtocoloRepository {

    @Inject
    ProtocoloJpaRepository protocoloJpaRepository;

    @Override
    public Protocolo save(Protocolo protocolo) {
        return protocoloJpaRepository.saveAndFlush(ProtocoloJpa.fromEntity(protocolo)).toEntity();
    }

    @Inject
    @PersistenceUnit(name = "reading")
    EntityManager em;
    private static final String QUERY_BUSCAR_PROTOCOLOS_POR_NOMBRE = "SELECT p.nombre_primer_director, p.nombre_segundo_director, p.fecha_subida, " +
            "p.nombre AS nombre_protocolo, i.nombre AS nombre_primer_integrante, i.nombre_segundo_integrante AS nombre_segundo_integrante, p.registro, ep.nombre AS Estado " +
            "FROM protocolo p JOIN estado_protocolo ep ON p.fk_id_estado = ep.id_estado JOIN integrantes i ON p.id_protocolo = i.fk_id_protocolo WHERE p.nombre = :nombre";

    private static final String PARAM_NOMBRE_PROTOCOLO = "nombre";

    @Override
    public List<Protocolo> findByNombreProtocolo(String nombre) {
        Stream<Object[]> busqueda = em.createNativeQuery(QUERY_BUSCAR_PROTOCOLOS_POR_NOMBRE).setParameter(PARAM_NOMBRE_PROTOCOLO, nombre).getResultStream();
        return busqueda.map(protocolo -> Protocolo.builder()
                .primerDirector((String) protocolo[0])
                .segundoDirector((String) protocolo[1])
                .fechaEntrega(protocolo[2] != null ? ((Timestamp) protocolo[2]).toLocalDateTime() : null)
                .nombre((String) protocolo[3])
                .nombrePrimerIntegrante((String) protocolo[4])
                .nombreSegundoIntegrante((String) protocolo[5])
                .registro((String) protocolo[6])
                .estadoProtocolo((String) protocolo[7])
                .build()).collect(Collectors.toList());
    }


    @Override
    public boolean existsByNombre(String nombre) {
        return protocoloJpaRepository.existsByNombre(nombre);
    }


}
