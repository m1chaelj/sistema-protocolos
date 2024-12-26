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

    public Either<ErrorCodesEnum, Alumno> InicioSesion(Alumno entity) {
        Either<ErrorCodesEnum, Alumno> result;

        if (entity == null || entity.getBoleta() == null || entity.getContrasena() == null) {
            return Either.left(ErrorCodesEnum.NOT_FOUND);
        }

        boolean credencialesValidas = verificarInicioSesion(entity.getBoleta(), entity.getContrasena());

        if (credencialesValidas) {
            Alumno alumno = alumnoRepository.findByBoleta(entity.getBoleta())
                    .orElse(null);

            if (alumno != null) {
                result = Either.right(alumno);
            } else {
                result = Either.left(ErrorCodesEnum.RNN007);
            }
        } else {
            result = Either.left(ErrorCodesEnum.RNN001);
        }

        return result;
    }


    private boolean verificarInicioSesion(Integer boleta, String contrasena) {
        return alumnoRepository.verificarInicioSesion(boleta, contrasena);
    }

        private boolean validarExisteBoletaAlumno(Integer boleta) {
       return alumnoRepository.validarExisteBoletaAlumno(boleta);
        }

}
