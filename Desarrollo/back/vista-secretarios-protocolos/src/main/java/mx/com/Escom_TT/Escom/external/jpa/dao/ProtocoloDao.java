package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.ProtocoloRepository;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;
import mx.com.Escom_TT.Escom.external.jpa.repository.ProtocoloJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.persistence.PersistenceUnit;


@ApplicationScoped
public class ProtocoloDao implements ProtocoloRepository {

@Inject
ProtocoloJpaRepository vistaSecretarioJpaRepository;

@PersistenceUnit(name = "reading")
@Inject
EntityManager em;

    private static final String QUERY_FIND_TODOS_PROTOCOLOS = "SELECT" +
            "    p.registro AS numero_registro_tt, " +
            "    p.nombre AS titulo_protocolo, " +
            "    p.nombre_primer_director AS primer_director, " +
            "    p.nombre_segundo_director AS segundo_director, " +
            "    a.nombre || ' ' || a.apellido_paterno || ' ' || a.apellido_materno AS estudiante_principal, " +
            "    ar.archivo AS archivo_pdf " +
            "FROM " +
            "    protocolo p " +
            "LEFT JOIN integrantes i ON p.id_protocolo = i.fk_id_protocolo " +
            "LEFT JOIN alumno a ON i.fk_id_alumno = a.id_alumno " +
            "LEFT JOIN archivo ar ON p.id_protocolo = ar.fk_id_protocolo";


    private static final String QUERY_FIND_SINODAL_ACADEMIA= " SELECT CONCAT(nombre, ' ', apellido_paterno, ' ', apellido_materno) AS nombre_completo " +
            "FROM sinodal WHERE academia = :academia";
            private static String PARAM_ACADEMIA = "academia";


    @Override
    public List<Protocolo> busquedaTodosProtocolos() {
        Stream<Object[]> todasBusquedas= em.createNativeQuery(QUERY_FIND_TODOS_PROTOCOLOS).getResultStream();
        return todasBusquedas.map(vista-> Protocolo.builder()
                .registro((String) vista[0])
                .tituloProtocolo((String)vista[1])
                .primerDirector((String)vista[2])
                .segundoDirector((String)vista[3])
                .nombreEstudiante((String)vista[4])
                .archivo((byte[])vista[5])
                .build()
        ).collect(Collectors.toList());
    }

    @Override
    public List <Sinodal> busquedaSinodalesAcademia(String academia) {
            List<String> result = em.createNativeQuery(QUERY_FIND_SINODAL_ACADEMIA)
                    .setParameter(PARAM_ACADEMIA, academia)
                    .getResultList();

            return result.stream()
                    .map(nombre -> Sinodal.builder()
                            .nombre(nombre)
                            .build())
                    .collect(Collectors.toList());
        }

    }
