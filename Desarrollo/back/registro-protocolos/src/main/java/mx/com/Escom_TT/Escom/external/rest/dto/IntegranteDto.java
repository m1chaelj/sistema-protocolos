package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Integrante;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IntegranteDto {

    @JsonProperty
    private Integer idIntegrante;
    @JsonProperty
    private Integer idProtocolo;
    @JsonProperty
    private String nombre;
    @JsonProperty
    private Integer boleta;
    @JsonProperty
    private Integer idAlumno;


    public static IntegranteDto fromEntity(Integrante integrante) {
        return IntegranteDto.builder()
                .idIntegrante(integrante.getIdIntegrante())
                .idProtocolo(integrante.getIdProtocolo())
                .nombre(integrante.getNombre())
                .boleta(integrante.getBoleta())
                .idAlumno(integrante.getIdAlumno())
                .build();
    }



}
