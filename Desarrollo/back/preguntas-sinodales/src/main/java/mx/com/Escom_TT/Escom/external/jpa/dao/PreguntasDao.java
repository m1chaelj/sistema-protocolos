package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.PreguntasRepository;
import mx.com.Escom_TT.Escom.core.entity.Preguntas;
import mx.com.Escom_TT.Escom.external.jpa.model.PreguntasJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.PreguntasJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class PreguntasDao implements PreguntasRepository {

    @Inject
    PreguntasJpaRepository preguntasJpaRepository;


    @Override
    public Preguntas save(Preguntas preguntas) {
        return preguntasJpaRepository.saveAndFlush(PreguntasJpa.fromEntity(preguntas)).toEntity();
    }
}
