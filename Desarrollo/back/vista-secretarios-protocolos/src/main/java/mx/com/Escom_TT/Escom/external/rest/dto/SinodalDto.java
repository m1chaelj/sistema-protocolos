package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class SinodalDto {

    @JsonProperty
    private String nombre;

    public static SinodalDto fromEntity(Sinodal sinodal) {
        return SinodalDto.builder()
                .nombre(sinodal.getNombre())
                .build();
    }
}
