package mx.com.Escom_TT.Escom.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class EstadoFinalProtocolo {


    private Integer id;
    private Integer idProtocolo;
    private String nombreSinodal;
    private String verificacion;
    private String comentarios;
    private String academia;
}
