package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Integrante;

import javax.persistence.Column;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IntegrantePersistDto {

    @JsonProperty
    private String nombre;
    @JsonProperty
    private Integer boleta;
    @JsonProperty
    private String nombreSegundoIntegrante;
    @JsonProperty
    private Integer boletaSegundoIntegrante;


    public Integrante toEntity (){
        return Integrante.builder()
                .nombre(nombre)
                .boleta(boleta)
                .nombreSegundoIntegrante(nombreSegundoIntegrante)
                .boletaSegundoIntegrante(boletaSegundoIntegrante)
                .build();
    }
}
