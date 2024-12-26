package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.SecretarioRepository;
import mx.com.Escom_TT.Escom.core.entity.Secretario;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;
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

    @Override
    public Secretario save (Secretario secretario){
        return secretarioJpaRepository.saveAndFlush(SecretarioJpa.fromEntity(secretario)).toEntity();
    }


    @PersistenceUnit(name = "reading")
    EntityManager entityManager;
    private static final String QUERY_FIND_ALUMNOS = "SELECT id_secretario_catt, nombre, apellido_paterno, apellido_materno, correo_electronico " +
            "FROM secretario_catt WHERE boleta = :boleta";
    private static final String PARAM_ID_BOLETA = "boleta";
    @Override
    public Optional<Secretario> findByBoleta(Integer boleta) {
        Stream<Object[]> busqueda= entityManager.createNativeQuery(QUERY_FIND_ALUMNOS).setParameter(PARAM_ID_BOLETA,boleta).getResultStream();
        return busqueda.map(secretario->Secretario.builder()
                .idSecretario((Integer)secretario[0])
                .nombre((String)secretario[1])
                .apellidoPaterno((String) secretario[2])
                .apellidoMaterno((String) secretario[3])
                .correoElectronico((String) secretario[4]).build()).findFirst();
    }

    @Override
    public boolean verificarInicioSesion(Integer boleta, String contrasena) {
        return secretarioJpaRepository.existsByBoletaAndContrasena(boleta, contrasena);
    }

    @Override
    public boolean validarExisteBoletaSecretario(Integer boleta) {
        return secretarioJpaRepository.existsById(boleta);
    }
}
