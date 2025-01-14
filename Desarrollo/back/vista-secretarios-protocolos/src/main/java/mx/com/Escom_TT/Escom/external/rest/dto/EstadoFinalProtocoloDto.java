package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.EstadoFinalProtocolo;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstadoFinalProtocoloDto {

    @JsonProperty
    private Integer id;
    @JsonProperty
    private Integer idProtocolo;
    @JsonProperty
    private String nombreSinodal;
    @JsonProperty
    private String verificacion;
    @JsonProperty
    private String comentarios;
    @JsonProperty
    private String academia;



    public static EstadoFinalProtocoloDto fromEntity(EstadoFinalProtocolo estadoFinalProtocolo) {
        return EstadoFinalProtocoloDto.builder()
                .id(estadoFinalProtocolo.getId())
                .idProtocolo(estadoFinalProtocolo.getIdProtocolo())
                .nombreSinodal(estadoFinalProtocolo.getNombreSinodal())
                .verificacion(estadoFinalProtocolo.getVerificacion())
                .comentarios(estadoFinalProtocolo.getComentarios())
                .academia(estadoFinalProtocolo.getAcademia())
                .build();

    }

}
