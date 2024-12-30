package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.ArchivoRepository;
import mx.com.Escom_TT.Escom.core.entity.Archivo;
import mx.com.Escom_TT.Escom.external.jpa.model.ArchivoJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.ArchivoJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class ArchivoDao implements ArchivoRepository {

    @Inject
    ArchivoJpaRepository archivoJpaRepository;


    @Override
    public Archivo save(Archivo archivo) {
        return archivoJpaRepository.saveAndFlush(ArchivoJpa.fromEntity(archivo)).toEntity();
    }
}
