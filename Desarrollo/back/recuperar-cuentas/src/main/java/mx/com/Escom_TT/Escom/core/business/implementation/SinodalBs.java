package mx.com.Escom_TT.Escom.core.business.implementation;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.business.input.SinodalService;
import mx.com.Escom_TT.Escom.core.business.output.SinodalRepository;
import mx.com.Escom_TT.Escom.core.entity.Secretario;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Optional;

@ApplicationScoped
public class SinodalBs implements SinodalService {

    @Inject
    SinodalRepository sinodalRepository;

     @Inject
    Mailer mailer;


    @Override
    public Either<ErrorCodesEnum, Sinodal> recuperar(Integer boleta) {
        Optional<Sinodal>sinodal = sinodalRepository.findByBoleta(boleta);

        if (sinodal.isEmpty()) {
            return Either.left(ErrorCodesEnum.ERROR);
        }

        Sinodal sinodales = sinodal.get();

        String asunto = "Recuperación de Credenciales";
        String cuerpoHtml = String.format(
                "<div style='background-color: #003366; padding: 10px; text-align: center;'>" +
                        "<h1 style='color: white; font-family: Arial, sans-serif; text-transform: uppercase; font-weight: bold; font-size: 70px; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);'>" +
                        "ESCOM" +
                        "</h1>" +
                        "</div>" +
                        "<div style='background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; color: #333; line-height: 1.6;'>" +
                        "<p style='font-size: 24px;'>Hola %s, de la academia de %s .</p>" +
                        "<p style='font-size: 20px;'>Hemos recibido tu solicitud de recuperación de credenciales. Aquí están tus datos:</p>" +
                        "<ul style='font-size: 20px;'>" +
                        "<li>Contraseña: %s</li>" +
                        "</ul>" +
                        "<p style='font-size: 20px;'>Por favor, no compartas esta información con nadie.</p>" +
                        "</div>",
                sinodales.getNombre(),
                sinodales.getAcademia(),
                sinodales.getContrasena()
        );

        try {
            mailer.send(
                    Mail.withHtml(
                            sinodales.getCorreoElectronico(),
                            asunto,
                            cuerpoHtml
                    )
            );
        } catch (Exception e) {
            return Either.left(ErrorCodesEnum.BAD_REQUEST);
        }

        return Either.right(sinodales);
    }
}
