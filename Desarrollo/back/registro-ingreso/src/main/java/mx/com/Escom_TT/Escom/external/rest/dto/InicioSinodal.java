package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;

public class InicioSinodal {
    @JsonProperty
    private Integer boleta;
    @JsonProperty
    private String contrasena;

    public Sinodal toEntity (){
        return Sinodal.builder().boleta(boleta).contrasena(contrasena).build();
    }
}
