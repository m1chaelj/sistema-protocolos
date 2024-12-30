package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.SinodalRepository;
import mx.com.Escom_TT.Escom.core.entity.Alumno;
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

    @Override
    public boolean validarExisteBoletaSinodal(Integer boleta) {
        return sinodalJpaRepository.existsById(boleta);
    }

    @Override
    public boolean verificarInicioSesion(Integer boleta, String contrasena) {
        return sinodalJpaRepository.existsByBoletaAndContrasena(boleta, contrasena);
    }

    @PersistenceUnit(name = "reading")
    EntityManager entityManager;
    private static final String QUERY_FIND_ALUMNOS = "SELECT id_sinodal, nombre, apellido_paterno, apellido_materno, correo_electronico " +
            "FROM sinodal WHERE boleta = :boleta";
    private static final String PARAM_ID_BOLETA = "boleta";
    @Override
    public Optional<Sinodal> findByBoleta(Integer boleta) {
        Stream<Object[]> busqueda= entityManager.createNativeQuery(QUERY_FIND_ALUMNOS).setParameter(PARAM_ID_BOLETA,boleta).getResultStream();
        return busqueda.map(sinodal->Sinodal.builder()
                .idSinodal((Integer)sinodal[0]).nombre((String)sinodal[1])
                .apellidoPaterno((String) sinodal[2])
                .apellidoMaterno((String) sinodal[3])
                .correoElectronico((String) sinodal[4]).build()).findFirst();
    }


    @Override
        public Sinodal save (Sinodal sinodal){
        return sinodalJpaRepository.saveAndFlush(SinodalJpa.fromEntity(sinodal)).toEntity();
    }
}
