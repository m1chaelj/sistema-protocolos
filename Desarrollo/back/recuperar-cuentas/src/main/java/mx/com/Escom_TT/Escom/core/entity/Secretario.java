package mx.com.Escom_TT.Escom.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Builder
@Getter
@Setter
public class Secretario {
    private String nombre;
    private String correoElectronico;
    private String contrasena;
    private Integer boleta;

}
