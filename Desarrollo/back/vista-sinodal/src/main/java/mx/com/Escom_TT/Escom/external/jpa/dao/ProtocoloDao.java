package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.ProtocoloRepository;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;
import mx.com.Escom_TT.Escom.external.jpa.repository.ProtocoloJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
@ApplicationScoped
public class ProtocoloDao implements ProtocoloRepository {
    @Inject
    ProtocoloJpaRepository protocoloJpaRepository;

    @PersistenceUnit(name = "reading")
    @Inject
    EntityManager em;



    private static final String QUERY_FIND_ACADEMIA_PROTOCOLOS = "SELECT " +
            "    p.registro AS numero_registro_tt, " +
            "    p.nombre AS titulo_protocolo, " +
            "    p.nombre_primer_director AS primer_director, " +
            "    p.nombre_segundo_director AS segundo_director, " +
            "    a.nombre || ' ' || a.apellido_paterno || ' ' || a.apellido_materno AS estudiante_principal, " +
            "    efp.academia AS academia, " +
            "    efp.verificacion AS verificacion, " +
            "    ar.archivo AS archivo_pdf " +
            "FROM protocolo p " +
            "LEFT JOIN integrantes i ON p.id_protocolo = i.fk_id_protocolo " +
            "LEFT JOIN alumno a ON i.fk_id_alumno = a.id_alumno " +
            "LEFT JOIN archivo ar ON p.id_protocolo = ar.fk_id_protocolo " +
            "LEFT JOIN estado_final_protocolo efp ON p.id_protocolo = efp.fk_id_protocolo " +
            "WHERE efp.academia = :academia";

    private static String PARAM_ACADEMIA="academia";

    @Override
    public Optional<Protocolo> BuscarAcademia(String academia) {
        Stream<Object[]>busqueda= em.createNativeQuery(QUERY_FIND_ACADEMIA_PROTOCOLOS).setParameter(PARAM_ACADEMIA,academia).getResultStream();
        return busqueda.map(sinodal->Protocolo.builder()
                .registro((String) sinodal[0])
                .tituloProtocolo((String) sinodal[1])
                .primerDirector((String) sinodal[2])
                .segundoDirector((String) sinodal[3])
                .nombreEstudiante((String) sinodal[4])
                .academia((String)sinodal[5])
                .verificacion((String) sinodal[6])
                .archivo((byte[]) sinodal[7]).build()
        ).findFirst();
    }
}
