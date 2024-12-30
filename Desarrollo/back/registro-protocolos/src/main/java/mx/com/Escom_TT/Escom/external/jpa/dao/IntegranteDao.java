package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.IntegranteRepository;
import mx.com.Escom_TT.Escom.core.entity.Integrante;
import mx.com.Escom_TT.Escom.external.jpa.model.IntegranteJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.IntegranteJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;


@ApplicationScoped
public class IntegranteDao implements IntegranteRepository {

    @Inject
    IntegranteJpaRepository integranteJpaRepository;

    @Override
    public Integrante save(Integrante integrante) {
        return integranteJpaRepository.saveAndFlush(IntegranteJpa.fromEntity(integrante)).toEntity();
    }
}
