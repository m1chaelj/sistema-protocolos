package mx.com.Escom_TT.Escom.core.business.implementation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.business.input.PreguntasService;
import mx.com.Escom_TT.Escom.core.business.output.PreguntasRepository;
import mx.com.Escom_TT.Escom.core.entity.Preguntas;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;
import java.time.LocalDateTime;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.sql.Timestamp;

@ApplicationScoped
public class PreguntasBs implements PreguntasService{

    @Inject
    PreguntasRepository preguntasRepository;

    @Override
    public Either<ErrorCodesEnum, Preguntas> crearPreguntas(Preguntas entity) {
        Either<ErrorCodesEnum, Preguntas> result;

        if (entity.getJsonRespuestas() == null) {
            result = Either.left(ErrorCodesEnum.NOT_FOUND);
        } else {
            try {
                // Asignamos el valor tal cual (si ya es un string JSON válido)
                String jsonRespuestas = entity.getJsonRespuestas();

                // Establecer la fecha actual
                Timestamp fechaActual = Timestamp.valueOf(LocalDateTime.now());
                entity.setFechaRespuesta(fechaActual);

                // Guardar en el repositorio, que maneja la conversión de String a jsonb
                Preguntas preguntaCreada = preguntasRepository.save(entity);
                result = Either.right(preguntaCreada);
            } catch (Exception e) {
                result = Either.left(ErrorCodesEnum.BAD_REQUEST); // Manejo de excepciones en caso de error
            }
        }

        return result;
    }

}
