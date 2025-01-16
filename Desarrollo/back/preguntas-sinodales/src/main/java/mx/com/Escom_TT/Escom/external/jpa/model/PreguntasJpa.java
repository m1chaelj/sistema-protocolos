package mx.com.Escom_TT.Escom.external.jpa.model;

import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Preguntas;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "respuesta")

public class PreguntasJpa {

    @Id
    @SequenceGenerator(name = "respuesta_id_respuesta_seq", sequenceName = "respuesta_id_respuesta_seq", allocationSize = 1)
    @GeneratedValue(generator = "respuesta_id_respuesta_seq", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_respuesta")
    private Integer idRespuesta;
    @Column(name = "fk_id_protocolo")
    private Integer idProtocolo;
    @Column(name = "json_respuestas")
    private String jsonRespuestas;
    @Column(name="fecha_respuesta")
    private Timestamp fechaRespuesta;

public static PreguntasJpa fromEntity(Preguntas preguntas) {
    return PreguntasJpa.builder().idRespuesta(preguntas.getIdPregunta())
            .idProtocolo(preguntas.getIdProtocolo())
            .jsonRespuestas(preguntas.getJsonRespuestas())
            .fechaRespuesta(preguntas.getFechaRespuesta())
            .build();
}

public Preguntas toEntity() {
    return Preguntas.builder()
            .idPregunta(idRespuesta)
            .idProtocolo(idProtocolo)
            .jsonRespuestas(jsonRespuestas)
            .fechaRespuesta(fechaRespuesta)
            .build();

}
}
