package mx.com.Escom_TT.Escom.core.business.implementation;

import io.vavr.control.Either;
import io.vertx.redis.client.Command;
import io.vertx.redis.client.Redis;
import io.vertx.redis.client.Request;
import lombok.extern.slf4j.Slf4j;
import mx.com.Escom_TT.Escom.core.business.input.SinodalService;
import mx.com.Escom_TT.Escom.core.business.output.SinodalRepository;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;
import mx.com.Escom_TT.Escom.core.entity.SinodalSession;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.UUID;

@Slf4j
@ApplicationScoped
public class SinodalBs implements SinodalService{

    @Inject
    SinodalRepository sinodalRepository;
    @Inject
    Redis redisClient;

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

        String academia = entity.getAcademia();
        if (academia == null || (!academia.equals("ACC") && !academia.equals("ACS") && !academia.equals("IA"))) {
            return Either.left(ErrorCodesEnum.RNN006);
        }

        entity.setIdEstado(1);
        entity.setIdEstadoVerificacion(1);

        Sinodal sinodalpersist = sinodalRepository.save(entity);
        result = Either.right(sinodalpersist);

        return result;
    }


    public Either<ErrorCodesEnum, SinodalSession> InicioSesion(Sinodal entity) {
        Either<ErrorCodesEnum, Sinodal> result;

        if (entity == null || entity.getBoleta() == null || entity.getContrasena() == null) {
            return Either.left(ErrorCodesEnum.NOT_FOUND);
        }

        boolean credencialesValidas = verificarInicioSesion(entity.getBoleta(), entity.getContrasena());

        if (credencialesValidas) {
            Sinodal sinodal = sinodalRepository.findByBoleta(entity.getBoleta())
                    .orElse(null);

            if (sinodal != null) {
                String sessionToken = UUID.randomUUID().toString();
                log.info("Token generado para la sesión: {}", sessionToken);
                redisClient.send(Request.cmd(Command.SETEX)
                        .arg(sessionToken)
                        .arg(3600)
                        .arg(entity.getContrasena()));
                SinodalSession sinodalSession = new SinodalSession(sinodal, sessionToken);

                return Either.right(sinodalSession);

            } else {
                return Either.left(ErrorCodesEnum.RNN007);
            }
        } else {
            return Either.left(ErrorCodesEnum.RNN001);
        }
    }


    private boolean validarExisteBoletaSinodal(Integer boleta) {
        return sinodalRepository.validarExisteBoletaSinodal(boleta);
    }

    private boolean verificarInicioSesion(Integer boleta, String contrasena) {
        return sinodalRepository.verificarInicioSesion(boleta, contrasena);
    }
}
