package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvaluacionDto {

    @JsonProperty
    private String directores;
    @JsonProperty
    private String registro;
    @JsonProperty
    private String nombreEstudiante;
    @JsonProperty
    private String tituloProtocolo;
    @JsonProperty
    private String academias;
    @JsonProperty
    private String sinodales;
    @JsonProperty
    private String evaluaciones;


    public static EvaluacionDto fromEntity(Protocolo protocolo) {
        return EvaluacionDto.builder()
                .directores(protocolo.getPrimerDirector())
                .registro(protocolo.getRegistro())
                .nombreEstudiante(protocolo.getNombreEstudiante())
                .tituloProtocolo(protocolo.getTituloProtocolo())
                .academias(protocolo.getAcademias())
                .sinodales(protocolo.getSinodales())
                .evaluaciones(protocolo.getEvaluaciones())
                .build();
    }
}
