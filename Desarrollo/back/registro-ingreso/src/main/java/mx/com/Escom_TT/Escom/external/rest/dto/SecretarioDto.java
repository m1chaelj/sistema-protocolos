package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Secretario;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SecretarioDto {
    @JsonProperty
    private String nombre;
    @JsonProperty
    private String apellidoPaterno;
    @JsonProperty
    private String apellidoMaterno;
    @JsonProperty
    private String correoElectronico;
    @JsonProperty
    private Integer idSecretario;
    @JsonProperty
    private String contrasena;
    @JsonProperty
    private Integer idEstado;
    @JsonProperty
    private Integer idEstadoVerificacion;
    @JsonProperty
    private Integer boleta;

    public static SecretarioDto fromEntity(Secretario secretario) {
        return SecretarioDto.builder().idSecretario(secretario.getIdSecretario())
                .nombre(secretario.getNombre())
                .contrasena(secretario.getContrasena())
                .correoElectronico(secretario.getCorreoElectronico()).apellidoPaterno(secretario.getApellidoPaterno())
                .apellidoMaterno(secretario.getApellidoMaterno()).idEstadoVerificacion(secretario.getIdEstadoVerificacion()).idEstado(secretario.getIdEstado())
                .boleta(secretario.getBoleta()).build();
    }
}
