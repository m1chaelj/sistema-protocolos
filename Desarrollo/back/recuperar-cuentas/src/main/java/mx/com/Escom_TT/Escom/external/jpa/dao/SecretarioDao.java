package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.SecretarioRepository;
import mx.com.Escom_TT.Escom.core.entity.Alumno;
import mx.com.Escom_TT.Escom.core.entity.Secretario;
import mx.com.Escom_TT.Escom.external.jpa.model.SecretarioJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.SecretarioJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceUnit;
import java.util.Optional;
import java.util.stream.Stream;

@ApplicationScoped
public class SecretarioDao implements SecretarioRepository {

    @Inject
    SecretarioJpaRepository secretarioJpaRepository;


    @PersistenceUnit(name = "reading")
    EntityManager entityManager;
    private static final String QUERY_FIND_ALUMNOS = "SELECT  nombre, contrasena, correo_electronico " +
            "FROM secretario_catt WHERE boleta = :boleta";
    private static final String PARAM_ID_BOLETA = "boleta";
    @Override
    public Optional<Secretario> findByBoleta(Integer boleta) {
        Stream<Object[]> busqueda= entityManager.createNativeQuery(QUERY_FIND_ALUMNOS).setParameter(PARAM_ID_BOLETA,boleta).getResultStream();
        return busqueda.map(secretario-> Secretario.builder()
                .nombre((String)secretario[0])
                .contrasena((String)secretario[1])
                .correoElectronico((String) secretario[2])
                .build()).findFirst();
    }


}
