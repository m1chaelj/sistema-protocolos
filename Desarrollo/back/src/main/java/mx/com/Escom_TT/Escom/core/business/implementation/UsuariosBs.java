package mx.com.Escom_TT.Escom.core.business.implementation;
import io.vavr.control.Either;
import lombok.extern.slf4j.Slf4j;
import mx.com.Escom_TT.Escom.core.business.input.AlumnoService;
import mx.com.Escom_TT.Escom.core.business.output.AlumnoRepository;
import mx.com.Escom_TT.Escom.core.business.output.SecretarioRepository;
import mx.com.Escom_TT.Escom.core.business.output.SinodalRepository;
import mx.com.Escom_TT.Escom.core.entity.Alumno;
import mx.com.Escom_TT.Escom.core.entity.Secretario;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@Slf4j
@ApplicationScoped
public class UsuariosBs implements AlumnoService {

    @Inject
    AlumnoRepository alumnoRepository;
    @Inject
    SinodalRepository sinodalRepository;
    @Inject
    SecretarioRepository secretarioRepository;

    public Either<ErrorCodesEnum, Alumno> create(Alumno entity) {
        Either<ErrorCodesEnum, Alumno> result;

        Integer id = entity.getBoleta();
        String idString = id.toString();

        if (idString.length() != 10 || !idString.matches("[0-9]+")) {
            return Either.left(ErrorCodesEnum.RNN001);
        }

        int ano = Integer.parseInt(idString.substring(0, 4));

        if (ano < 2019 || validarExisteBoletaAlumno(entity.getBoleta())) {
            return Either.left(ErrorCodesEnum.RNN001);
        }
        String email = entity.getCorreoElectronico();
        String emailRegex = "^[a-zA-Z0-9]+@[a-z]+\\.[a-z\\.]{2,6}$";
        if (email == null || !email.matches(emailRegex)) {
            return Either.left(ErrorCodesEnum.RNN002);
        }

        String password = entity.getContrasena();
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$";
        if (password == null || !password.matches(passwordRegex)) {
            return Either.left(ErrorCodesEnum.RNN004);
        }

        entity.setIdEstado(1);
        entity.setIdEstadoVerificacion(1);

        Alumno alumnopersist = alumnoRepository.save(entity);
        result = Either.right(alumnopersist);

        return result;
    }

    public Either<ErrorCodesEnum, Sinodal> create(Sinodal entity) {
        Either<ErrorCodesEnum, Sinodal> result;
        Integer id = entity.getBoleta();
        String idString = id.toString();

        if (idString.length() != 10 || !idString.matches("[0-9]+")) {
            return Either.left(ErrorCodesEnum.RNN001);
        }

        if (validarExisteBoletaSinodal(entity.getBoleta())) {
            return Either.left(ErrorCodesEnum.RNN001);
        }

        String email = entity.getCorreoElectronico();
        String emailRegex = "^[a-zA-Z0-9]+@[a-z]+\\.[a-z\\.]{2,6}$";
        if (email == null || !email.matches(emailRegex)) {
            return Either.left(ErrorCodesEnum.RNN002);
        }

        String password = entity.getContrasena();
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$";
        if (password == null || !password.matches(passwordRegex)) {
            return Either.left(ErrorCodesEnum.RNN004);
        }

        entity.setIdEstado(1);
        entity.setIdEstadoVerificacion(1);
        Sinodal sinodalpersist = sinodalRepository.save(entity);
        result = Either.right(sinodalpersist);

        return result;
    }



   public Either<ErrorCodesEnum, Secretario> create(Secretario entity) {
       Either<ErrorCodesEnum, Secretario> result;
       Integer id = entity.getBoleta();
       String idString = id.toString();

       if (idString.length() != 10 || !idString.matches("[0-9]+")) {
           return Either.left(ErrorCodesEnum.RNN001);
       }

       if (validarExisteBoletaSecretario(entity.getBoleta())) {
           return Either.left(ErrorCodesEnum.RNN001);
       }

       String email = entity.getCorreoElectronico();
       String emailRegex = "^[a-zA-Z0-9]+@[a-z]+\\.[a-z\\.]{2,6}$";
       if (email == null || !email.matches(emailRegex)) {
           return Either.left(ErrorCodesEnum.RNN002);
       }

       String password = entity.getContrasena();
       String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$";
       if (password == null || !password.matches(passwordRegex)) {
           return Either.left(ErrorCodesEnum.RNN004);
       }

       entity.setIdEstado(1);
       entity.setIdEstadoVerificacion(1);
       Secretario secretariopersist = secretarioRepository.save(entity);
       result = Either.right(secretariopersist);

       return result;

   }

        private boolean validarExisteBoletaAlumno(Integer boleta) {
       return alumnoRepository.validarExisteBoletaAlumno(boleta);
        }


        private boolean validarExisteBoletaSinodal(Integer boleta) {
        return sinodalRepository.validarExisteBoletaSinodal(boleta);
        }

        private boolean validarExisteBoletaSecretario(Integer boleta) {
        return secretarioRepository.validarExisteBoletaSecretario(boleta);
        }
}
