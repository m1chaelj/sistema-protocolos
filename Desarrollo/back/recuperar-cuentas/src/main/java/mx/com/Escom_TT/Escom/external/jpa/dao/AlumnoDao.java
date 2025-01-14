package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.AlumnoRepository;
import mx.com.Escom_TT.Escom.core.entity.Alumno;
import mx.com.Escom_TT.Escom.external.jpa.model.AlumnoJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.AlumnoJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceUnit;
import java.util.Optional;
import java.util.stream.Stream;


@ApplicationScoped
public class AlumnoDao implements AlumnoRepository {

    @Inject
    AlumnoJpaRepository alumnoJpaRepository;

    @PersistenceUnit(name = "reading")
    EntityManager entityManager;
    private static final String QUERY_FIND_ALUMNOS = "SELECT  nombre, contrasena, correo_electronico " +
            "FROM alumno WHERE boleta = :boleta";
    private static final String PARAM_ID_BOLETA = "boleta";
    @Override
    public Optional<Alumno> findByBoleta(Integer boleta) {
    Stream<Object[]>busqueda= entityManager.createNativeQuery(QUERY_FIND_ALUMNOS).setParameter(PARAM_ID_BOLETA,boleta).getResultStream();
    return busqueda.map(alumno->Alumno.builder()
            .nombre((String)alumno[0])
            .contrasena((String)alumno[1])
            .correoElectronico((String) alumno[2])
            .build()).findFirst();
    }



}
