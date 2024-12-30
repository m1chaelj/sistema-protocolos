package mx.com.Escom_TT.Escom.external.rest.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProtocoloDto {
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


    public static ProtocoloDto fromEntity(Protocolo protocolo) {
        return ProtocoloDto.builder()
                .nombre(protocolo.getNombre()).primerDirector(protocolo.getPrimerDirector())
                .segundoDirector(protocolo.getSegundoDirector())
                .fechaEntrega(protocolo.getFechaEntrega()).registro(protocolo.getRegistro()).build();

    }
}
