package mx.com.Escom_TT.Escom.core.business.implementation;

import io.vavr.control.Either;
import lombok.extern.slf4j.Slf4j;
import mx.com.Escom_TT.Escom.core.business.input.SecretarioService;
import mx.com.Escom_TT.Escom.core.business.output.SecretarioRepository;
import mx.com.Escom_TT.Escom.core.entity.Alumno;
import mx.com.Escom_TT.Escom.core.entity.Secretario;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@Slf4j
@ApplicationScoped
public class SecretarioBs implements SecretarioService {

    @Inject
    SecretarioRepository secretarioRepository;

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


    public Either<ErrorCodesEnum, Secretario> InicioSesion(Secretario entity) {
        Either<ErrorCodesEnum, Secretario> result;

        if (entity == null || entity.getBoleta() == null || entity.getContrasena() == null) {
            return Either.left(ErrorCodesEnum.NOT_FOUND);
        }

        boolean credencialesValidas = verificarInicioSesion(entity.getBoleta(), entity.getContrasena());

        if (credencialesValidas) {
            Secretario secretario = secretarioRepository.findByBoleta(entity.getBoleta())
                    .orElse(null);

            if (secretario != null) {
                result = Either.right(secretario);
            } else {
                result = Either.left(ErrorCodesEnum.RNN007);
            }
        } else {
            result = Either.left(ErrorCodesEnum.RNN001);
        }

        return result;
    }


    private boolean validarExisteBoletaSecretario(Integer boleta) {
        return secretarioRepository.validarExisteBoletaSecretario(boleta);
    }


    private boolean verificarInicioSesion(Integer boleta, String contrasena) {
        return secretarioRepository.verificarInicioSesion(boleta, contrasena);
    }
}
