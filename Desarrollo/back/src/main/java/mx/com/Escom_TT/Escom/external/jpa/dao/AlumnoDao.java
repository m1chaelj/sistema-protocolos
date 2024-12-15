package mx.com.Escom_TT.Escom.external.jpa.dao;
import mx.com.Escom_TT.Escom.core.business.output.AlumnoRepository;
import mx.com.Escom_TT.Escom.core.entity.Alumno;
import mx.com.Escom_TT.Escom.external.jpa.model.AlumnoJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.AlumnoJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;


@ApplicationScoped
public class AlumnoDao implements AlumnoRepository {

    @Inject
    AlumnoJpaRepository alumnoJpaRepository;

@Override
   public Alumno save (Alumno alumno){
       return alumnoJpaRepository.saveAndFlush(AlumnoJpa.fromEntity(alumno)).toEntity();
   }
}
