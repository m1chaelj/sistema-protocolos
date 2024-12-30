package mx.com.Escom_TT.Escom.external.rest.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProtocoloPersistDto {

   @JsonProperty
    private String nombre;
    @JsonProperty
    private String primerDirector;
    @JsonProperty
    private String segundoDirector;


    public Protocolo toEntity(){
        return Protocolo.builder().nombre(nombre)
                .primerDirector(primerDirector)
                .segundoDirector(segundoDirector)
                .build();
    }
}
