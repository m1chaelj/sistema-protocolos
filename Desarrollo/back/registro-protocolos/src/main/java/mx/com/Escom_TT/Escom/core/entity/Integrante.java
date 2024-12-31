package mx.com.Escom_TT.Escom.core.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class Integrante {

    private Integer idIntegrante;
    private Integer idProtocolo;
    private String nombre;
    private Integer boleta;
    private Integer IdAlumno;
    private String nombreSegundoIntegrante;
    private Integer boletaSegundoIntegrante;

}
