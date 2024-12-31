package mx.com.Escom_TT.Escom.core.entity;

import lombok.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Builder
@Getter
@Setter
public class Protocolo {

    private Integer idProtocolo;
    private String nombre;
    private Integer idEstado;
    private String primerDirector;
    private String segundoDirector;
    private LocalDateTime fechaEntrega;
    private String registro;
    private String nombrePrimerIntegrante;
    private String nombreSegundoIntegrante;
    private String estadoProtocolo;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Protocolo protocolo = (Protocolo) o;
        return Objects.equals(idProtocolo, protocolo.idProtocolo);


}
}
