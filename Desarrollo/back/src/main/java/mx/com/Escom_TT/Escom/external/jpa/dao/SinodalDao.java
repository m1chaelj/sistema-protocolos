package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.SinodalRepository;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;
import mx.com.Escom_TT.Escom.external.jpa.model.SinodalJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.SinodalJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;


@ApplicationScoped
public class SinodalDao implements SinodalRepository {

    @Inject
    SinodalJpaRepository sinodalJpaRepository;

    @Override
    public boolean validarExisteBoletaSinodal(Integer boleta) {
        return sinodalJpaRepository.existsById(boleta);
    }


    @Override
        public Sinodal save (Sinodal sinodal){
        return sinodalJpaRepository.saveAndFlush(SinodalJpa.fromEntity(sinodal)).toEntity();
    }
}
