package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.EstadoFinalProtocolo;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstadoFinalProtocoloPersistDto {


    @JsonProperty
    private String nombreSinodal;
    @JsonProperty
    private String academia;

    public EstadoFinalProtocolo toEntity() {
        return EstadoFinalProtocolo.builder()
                .nombreSinodal(nombreSinodal)
                .academia(academia)
                .build();
    }
}
