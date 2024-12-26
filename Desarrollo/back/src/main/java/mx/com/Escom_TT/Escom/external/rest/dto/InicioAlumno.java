package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import mx.com.Escom_TT.Escom.core.entity.Alumno;

public class InicioAlumno {
    @JsonProperty
    private Integer boleta;
    @JsonProperty
    private String contrasena;

    public Alumno toEntity() {
        return Alumno.builder().boleta(boleta).contrasena(contrasena).build();
    }
}
