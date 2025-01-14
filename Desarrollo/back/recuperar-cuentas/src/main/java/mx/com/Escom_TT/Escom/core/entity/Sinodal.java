package mx.com.Escom_TT.Escom.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;



@Builder
@Getter
@Setter
public class Sinodal {
    private String nombre;
    private String correoElectronico;
    private String contrasena;
    private Integer boleta;
    private String academia;

}
