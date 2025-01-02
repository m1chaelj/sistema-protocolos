package mx.com.Escom_TT.Escom.external.jpa.model;


import lombok.*;
import javax.persistence.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "estado_protocolo")
public class EstadoProtocoloJpa {
    @Id
    @SequenceGenerator(name = "estado_protocolo_id_estado_seq", sequenceName = "estado_protocolo_id_estado_seq", allocationSize = 1)
    @GeneratedValue(generator = "estado_protocolo_id_estado_seq", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_estado")
    private Integer idEstado;
    @Column(name = "nombre")
    private String nombre;
}