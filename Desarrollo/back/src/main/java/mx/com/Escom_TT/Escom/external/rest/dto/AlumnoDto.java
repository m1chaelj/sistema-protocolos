package mx.com.Escom_TT.Escom.external.rest.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Alumno;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class AlumnoDto {
    @JsonProperty
    private String nombre;
    @JsonProperty
    private String apellidoPaterno;
    @JsonProperty
    private String apellidoMaterno;
    @JsonProperty
    private String correoElectronico;
    @JsonProperty
    private Integer idAlumno;
    @JsonProperty
    private String contrasena;
    @JsonProperty
    private Integer idEstado;
    @JsonProperty
    private Integer idEstadoVerificacion;
    @JsonProperty
    private Integer boleta;

    public static AlumnoDto fromEntity(Alumno alumno) {
        return AlumnoDto.builder().idAlumno(alumno.getIdAlumno())
                .nombre(alumno.getNombre())
                .contrasena(alumno.getContrasena())
                .correoElectronico(alumno.getCorreoElectronico()).apellidoPaterno(alumno.getApellidoPaterno())
                .apellidoMaterno(alumno.getApellidoMaterno()).idEstadoVerificacion(alumno.getIdEstadoVerificacion()).idEstado(alumno.getIdEstado())
                .boleta(alumno.getBoleta()).build();
    }
    }
