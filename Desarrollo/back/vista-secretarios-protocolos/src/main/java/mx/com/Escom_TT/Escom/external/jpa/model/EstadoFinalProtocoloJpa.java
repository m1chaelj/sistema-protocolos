package mx.com.Escom_TT.Escom.external.jpa.model;


import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.EstadoFinalProtocolo;

import javax.persistence.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "estado_final_protocolo")
public class EstadoFinalProtocoloJpa {

    @SequenceGenerator(name = "estado_final_protocolo_id_decision_seq", sequenceName = "estado_final_protocolo_id_decision_seq", allocationSize = 1)
    @GeneratedValue(generator = "estado_final_protocolo_id_decision_seq", strategy = GenerationType.SEQUENCE)
    @Id
    @Column(name="id_decision")
    private Integer idDecision;
    @Column(name="fk_id_protocolo")
    private Integer idProtocolo;
    @Column(name="nombre_sinodal")
    private String nombreSinodal;
    @Column(name="verificacion")
    private String verificacion;
    @Column(name="comentarios")
    private String comentarios;
    @Column(name="academia")
    private String academia;

    public static EstadoFinalProtocoloJpa fromEntity(EstadoFinalProtocolo estadoFinalProtocolo) {
        return EstadoFinalProtocoloJpa.builder()
                .idDecision(estadoFinalProtocolo.getId())
                .idProtocolo(estadoFinalProtocolo.getIdProtocolo())
                .nombreSinodal(estadoFinalProtocolo.getNombreSinodal())
                .verificacion(estadoFinalProtocolo.getVerificacion())
                .comentarios(estadoFinalProtocolo.getComentarios())
                .academia(estadoFinalProtocolo.getAcademia())
                .build();
    }

    public EstadoFinalProtocolo toEntity() {
        return EstadoFinalProtocolo.builder()
                .id(idDecision)
                .idProtocolo(idProtocolo)
                .nombreSinodal(nombreSinodal)
                .verificacion(verificacion)
                .comentarios(comentarios)
                .academia(academia)
                .build();


    }

}
