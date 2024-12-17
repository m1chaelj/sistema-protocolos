package mx.com.Escom_TT.Escom.core.business.implementation;

import io.vavr.control.Either;
import lombok.extern.slf4j.Slf4j;
import mx.com.Escom_TT.Escom.core.business.input.SinodalService;
import mx.com.Escom_TT.Escom.core.business.output.SinodalRepository;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@Slf4j
@ApplicationScoped
public class SinodalBs implements SinodalService{

    @Inject
    SinodalRepository sinodalRepository;

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

    private boolean validarExisteBoletaSinodal(Integer boleta) {
        return sinodalRepository.validarExisteBoletaSinodal(boleta);
    }
}
