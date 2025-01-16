package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Preguntas;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PreguntasPersistDto {
@JsonProperty
private String jsonRespuestas;

    public Preguntas toEntity() {
        return Preguntas.builder()
                .jsonRespuestas(jsonRespuestas)
                .build();
    }
}
