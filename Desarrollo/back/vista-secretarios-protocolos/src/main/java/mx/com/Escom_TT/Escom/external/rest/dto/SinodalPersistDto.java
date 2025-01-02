package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;

public class SinodalPersistDto {

    @JsonProperty
    private String nombre;

    public Sinodal toEntity(){
        return Sinodal.builder()
                .nombre(this.nombre)
                .build();
    }
}
