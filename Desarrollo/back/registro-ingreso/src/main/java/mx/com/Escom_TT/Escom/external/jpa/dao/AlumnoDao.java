package mx.com.Escom_TT.Escom.external.jpa.dao;
import mx.com.Escom_TT.Escom.core.business.output.AlumnoRepository;
import mx.com.Escom_TT.Escom.core.entity.Alumno;
import mx.com.Escom_TT.Escom.external.jpa.model.AlumnoJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.AlumnoJpaRepository;

import java.util.Optional;
import java.util.stream.Stream;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;


@ApplicationScoped
public class AlumnoDao implements AlumnoRepository {

    @Inject
    AlumnoJpaRepository alumnoJpaRepository;

    @PersistenceUnit(name = "reading")
    EntityManager entityManager;
    private static final String QUERY_FIND_ALUMNOS = "SELECT id_alumno, nombre, apellido_paterno, apellido_materno, correo_electronico " +
            "FROM alumno WHERE boleta = :boleta";
    private static final String PARAM_ID_BOLETA = "boleta";
    @Override
    public Optional<Alumno> findByBoleta(Integer boleta) {
    Stream<Object[]>busqueda= entityManager.createNativeQuery(QUERY_FIND_ALUMNOS).setParameter(PARAM_ID_BOLETA,boleta).getResultStream();
    return busqueda.map(alumno->Alumno.builder()
            .idAlumno((Integer)alumno[0]).nombre((String)alumno[1])
            .apellidoPaterno((String) alumno[2])
            .apellidoMaterno((String) alumno[3])
            .correoElectronico((String) alumno[4]).build()).findFirst();
    }

    @Override
    public boolean verificarInicioSesion(Integer boleta, String contrasena) {
        return alumnoJpaRepository.existsByBoletaAndContrasena(boleta, contrasena);
    }

    @Override
   public Alumno save (Alumno alumno){
       return alumnoJpaRepository.saveAndFlush(AlumnoJpa.fromEntity(alumno)).toEntity();
   }


}
