package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import mx.com.Escom_TT.Escom.core.entity.Secretario;

public class InicioSecretario {
    @JsonProperty
    private Integer boleta;
    @JsonProperty
    private String contrasena;

    public Secretario toEntity() {
        return Secretario.builder().boleta(boleta).contrasena(contrasena).build();
    }
}
