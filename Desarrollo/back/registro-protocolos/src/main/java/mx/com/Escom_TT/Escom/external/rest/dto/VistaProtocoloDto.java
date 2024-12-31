package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VistaProtocoloDto {

    @JsonProperty
    private String nombre;
    @JsonProperty
    private String primerDirector;
    @JsonProperty
    private String segundoDirector;
    @JsonProperty
    private LocalDateTime fechaEntrega;
    @JsonProperty
    private String registro;
    @JsonProperty
    private String nombrePrimerIntegrante;
    @JsonProperty
    private String nombreSegundoIntegrante;
    @JsonProperty
    private String estadoProtocolo;



    public static VistaProtocoloDto fromEntity(Protocolo protocolo) {
        return VistaProtocoloDto.builder()
                .nombre(protocolo.getNombre())
                .primerDirector(protocolo.getPrimerDirector())
                .segundoDirector(protocolo.getSegundoDirector())
                .fechaEntrega(protocolo.getFechaEntrega()).registro(protocolo.getRegistro())
                .nombrePrimerIntegrante(protocolo.getNombrePrimerIntegrante())
                .nombreSegundoIntegrante(protocolo.getNombreSegundoIntegrante())
                .estadoProtocolo(protocolo.getEstadoProtocolo())
                .registro(protocolo.getRegistro())
                .build();

    }

}
