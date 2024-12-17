package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import mx.com.Escom_TT.Escom.core.entity.Secretario;

public class SecretarioPersistDto {
    @JsonProperty
    private String nombre;
    @JsonProperty
    private String apellidoPaterno;
    @JsonProperty
    private String apellidoMaterno;
    @JsonProperty
    private String correoElectronico;
    @JsonProperty
    private Integer boleta;
    @JsonProperty
    private String contrasena;

    public Secretario toEntity() {
        return Secretario.builder().boleta(boleta)
                .nombre(nombre)
                .contrasena(contrasena)
                .correoElectronico(correoElectronico).apellidoPaterno(apellidoPaterno)
                .apellidoMaterno(apellidoMaterno).build();
    }
}
