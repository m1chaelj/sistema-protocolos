package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Alumno;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecuperarDto {


    @JsonProperty
    private Integer boleta;

    public Alumno toEntity() {
        return Alumno.builder().boleta(boleta)
               .build();
    }
}
