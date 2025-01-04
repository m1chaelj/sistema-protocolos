package mx.com.Escom_TT.Escom.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.InputStream;

@Builder
@Getter
@Setter
public class Protocolo {

    private String primerDirector;
    private String segundoDirector;
    private String registro;
    private String nombreEstudiante;
    private String tituloProtocolo;
    private byte[] archivo;


}
