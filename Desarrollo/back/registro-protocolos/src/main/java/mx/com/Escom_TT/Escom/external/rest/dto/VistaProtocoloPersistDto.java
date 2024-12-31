package mx.com.Escom_TT.Escom.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VistaProtocoloPersistDto {

    @JsonProperty
    private String nombre;

    public Protocolo toEntity(){
        return Protocolo.builder().nombre(nombre).build();
    }
}
