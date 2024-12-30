package mx.com.Escom_TT.Escom.external.rest.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Alumno;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class AlumnoPersistDto {
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

    public Alumno toEntity() {
        return Alumno.builder().boleta(boleta)
                .nombre(nombre)
                .contrasena(contrasena)
                .correoElectronico(correoElectronico).apellidoPaterno(apellidoPaterno)
                .apellidoMaterno(apellidoMaterno).build();
    }
}
