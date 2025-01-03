package mx.com.Escom_TT.Escom.core.business.implementation;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
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
    @Inject
    Mailer mailer;

    public Either<ErrorCodesEnum, Sinodal> create(Sinodal entity) {
        Either<ErrorCodesEnum, Sinodal> result;
        Integer id = entity.getBoleta();
        String idString = id.toString();

        if (idString.length() != 10 || !idString.matches("[0-9]+")) {
            return Either.left(ErrorCodesEnum.RNN001);
        }

        if (validarExisteBoletaSinodal(entity.getBoleta())) {
            return Either.left(ErrorCodesEnum.RNN003);
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

        String confirmationLink = "http://localhost:3000/inicio/sinodal";

        mailer.send(
                Mail.withHtml(
                        email,
                        "Confirmación de Registro",
                        "<div style='background-color: #003366; padding: 10px; text-align: center;'>" +
                                "<h1 style='color: white; font-family: Arial, sans-serif; text-transform: uppercase; font-weight: bold; font-size: 50px; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);'>" +
                                "ESCOM" +
                                "</h1>" +
                                "</div>" +
                                "<div style='background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; color: #333; line-height: 1.6;'>" +
                                "<h1 style='color: #003366; font-size: 28px;'>¡Bienvenido a Protocolos-ESCOM!</h1>" +
                                "<p style='font-size: 18px; color: #555;'>Gracias por registrarte, <b>" + entity.getNombre() + " " + entity.getApellidoPaterno() + "</b>.</p>" +
                                "<p style='font-size: 18px; color: #555;'>Da click para confirmar tu registro:</p>" +
                                "<p><a href='" + confirmationLink + "' style='color: blue; font-size: 22px; font-weight: bold;'>Confirmar Registro</a></p>" +
                                "<p style='font-size: 18px; color: #555;'>Por favor, da click para comenzar.</p>" +
                                "<p style='font-size: 18px; color: #555;'>Saludos,<br>El equipo de ESCOM</p>" +
                                "</div>"
                )
        );

            entity.setIdEstado(2);
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
        return sinodalRepository.findByBoleta(boleta).isPresent();
    }

    private boolean verificarInicioSesion(Integer boleta, String contrasena) {
        return sinodalRepository.verificarInicioSesion(boleta, contrasena);
    }
}
