package mx.com.Escom_TT.Escom.core.entity;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;


@Builder
@Getter
@Setter
public class Preguntas {
    private Integer idPregunta;
    private Integer idProtocolo;
    private String jsonRespuestas;
    private Timestamp fechaRespuesta;
}
