package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProtocoloDto {
    @JsonProperty
    private String primerDirector;
    @JsonProperty
    private String segundoDirector;
    @JsonProperty
    private String registro;
    @JsonProperty
    private String nombreEstudiante;
    @JsonProperty
    private String tituloProtocolo;



    public static ProtocoloDto fromEntity(Protocolo protocolo) {
        return ProtocoloDto.builder()
                .primerDirector(protocolo.getPrimerDirector())
                .segundoDirector(protocolo.getSegundoDirector())
                .registro(protocolo.getRegistro())
                .nombreEstudiante(protocolo.getNombreEstudiante())
                .tituloProtocolo(protocolo.getTituloProtocolo())
                .build();
    }
}

