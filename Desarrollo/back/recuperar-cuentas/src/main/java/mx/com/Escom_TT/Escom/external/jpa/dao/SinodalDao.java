package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.SinodalRepository;
import mx.com.Escom_TT.Escom.core.entity.Secretario;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;
import mx.com.Escom_TT.Escom.external.jpa.model.SinodalJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.SinodalJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceUnit;
import java.util.Optional;
import java.util.stream.Stream;


@ApplicationScoped
public class SinodalDao implements SinodalRepository {

    @Inject
    SinodalJpaRepository sinodalJpaRepository;


    @PersistenceUnit(name = "reading")
    EntityManager entityManager;
    private static final String QUERY_FIND_ALUMNOS = "SELECT  nombre, contrasena, correo_electronico, academia " +
            "FROM sinodal WHERE boleta = :boleta";
    private static final String PARAM_ID_BOLETA = "boleta";
    @Override
    public Optional<Sinodal> findByBoleta(Integer boleta) {
        Stream<Object[]> busqueda= entityManager.createNativeQuery(QUERY_FIND_ALUMNOS).setParameter(PARAM_ID_BOLETA,boleta).getResultStream();
        return busqueda.map(sinodal-> Sinodal.builder()
                .nombre((String)sinodal[0])
                .contrasena((String)sinodal[1])
                .correoElectronico((String) sinodal[2])
                .academia((String)sinodal[3])
                .build()).findFirst();
    }

}
