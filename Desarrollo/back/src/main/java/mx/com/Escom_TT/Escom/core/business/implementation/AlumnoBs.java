package mx.com.Escom_TT.Escom.core.business.implementation;
import io.vavr.control.Either;
import lombok.extern.slf4j.Slf4j;
import mx.com.Escom_TT.Escom.core.business.input.AlumnoService;
import mx.com.Escom_TT.Escom.core.business.output.AlumnoRepository;
import mx.com.Escom_TT.Escom.core.entity.Alumno;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@Slf4j
@ApplicationScoped
public class AlumnoBs implements AlumnoService {

    @Inject
    AlumnoRepository alumnoRepository;

   public Either<ErrorCodesEnum, Alumno> create(Alumno entity) {
       Either<ErrorCodesEnum, Alumno> result;
       Integer id = entity.getBoleta();
       String idString = id.toString();
       int ano = Integer.parseInt(idString.substring(0, 4));
       if (ano < 2019) {
           result = Either.left(ErrorCodesEnum.RNS001);
       } else {
           entity.setIdEstado(1);
           entity.setIdEstadoVerificacion(1);
            var alumnopersist = alumnoRepository.save(entity);
            result = Either.right(alumnopersist);

       }
       return result;
   }
}
