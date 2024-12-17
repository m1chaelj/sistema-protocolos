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
    @JsonProperty
    private String apellidoPaterno;
    @JsonProperty
    private String apellidoMaterno;
    @JsonProperty
    private String correoElectronico;
    @JsonProperty
    private Integer idSinodal;
    @JsonProperty
    private String contrasena;
    @JsonProperty
    private Integer idEstado;
    @JsonProperty
    private Integer idEstadoVerificacion;
    @JsonProperty
    private Integer boleta;


    public static SinodalDto fromEntity(Sinodal sinodal) {
        return SinodalDto.builder().idSinodal(sinodal.getIdSinodal())
                .nombre(sinodal.getNombre())
                .contrasena(sinodal.getContrasena())
                .correoElectronico(sinodal.getCorreoElectronico()).apellidoPaterno(sinodal.getApellidoPaterno())
                .apellidoMaterno(sinodal.getApellidoMaterno()).idEstadoVerificacion(sinodal.getIdEstadoVerificacion()).idEstado(sinodal.getIdEstado())
                .boleta(sinodal.getBoleta()).build();
    }

}
