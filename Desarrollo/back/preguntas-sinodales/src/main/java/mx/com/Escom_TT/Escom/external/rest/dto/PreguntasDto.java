package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Preguntas;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PreguntasDto {

    @JsonProperty
    private String jsonRespuestas;
    private Timestamp fechaRespuesta;
    @JsonProperty
    private Integer idPregunta;
    @JsonProperty
    private Integer idProtocolo;


    public static PreguntasDto fromEntity(Preguntas preguntas) {
        return PreguntasDto.builder()
                .idPregunta(preguntas.getIdPregunta())
                .idProtocolo(preguntas.getIdProtocolo())
                .fechaRespuesta(preguntas.getFechaRespuesta())
                .jsonRespuestas(preguntas.getJsonRespuestas())
                .build();
    }
}
