package mx.com.Escom_TT.Escom.core.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class Protocolo {

    private String primerDirector;
    private String segundoDirector;
    private String registro;
    private String nombreEstudiante;
    private String tituloProtocolo;
    private byte[] archivo;
    private String verificacion;
    private String academia;
}
