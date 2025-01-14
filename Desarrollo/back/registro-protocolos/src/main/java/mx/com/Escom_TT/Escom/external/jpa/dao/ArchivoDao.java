package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.ArchivoRepository;
import mx.com.Escom_TT.Escom.core.entity.Archivo;
import mx.com.Escom_TT.Escom.external.jpa.model.ArchivoJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.ArchivoJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceUnit;
import java.util.Optional;
import java.util.stream.Stream;

@ApplicationScoped
public class ArchivoDao implements ArchivoRepository {

    @Inject
    ArchivoJpaRepository archivoJpaRepository;


    @Override
    public Archivo save(Archivo archivo) {
        return archivoJpaRepository.saveAndFlush(ArchivoJpa.fromEntity(archivo)).toEntity();
    }

    @Override
    public Archivo update(Archivo archivo) {
        return archivoJpaRepository.saveAndFlush(ArchivoJpa.fromEntity(archivo)).toEntity();
    }
    @Inject
    EntityManager entityManager;
    @PersistenceUnit(name="reading")
    private static final String QUERY_FIND_ARCHIVOS = "SELECT archivo.id_archivo, archivo.archivo " +
            "FROM archivo \n" +
            "WHERE archivo.nombre = :fileName";
    private static final String PARAM_FILE_NAME = "fileName";

    @Override
    public Optional<Archivo> existe(String fileName) {
        Stream<Object[]> busqueda = entityManager
                .createNativeQuery(QUERY_FIND_ARCHIVOS)
                .setParameter(PARAM_FILE_NAME, fileName)
                .getResultStream();

        return busqueda
                .map(archivo -> Archivo.builder()
                        .id((Integer) archivo[0]) // Asegúrate de que el tipo de id es Integer
                        .archivo((byte[]) archivo[1])
                        .build()
                )
                .findFirst();
    }
}
