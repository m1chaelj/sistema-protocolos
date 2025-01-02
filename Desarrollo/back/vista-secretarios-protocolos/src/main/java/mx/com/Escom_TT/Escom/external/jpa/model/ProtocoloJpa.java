package mx.com.Escom_TT.Escom.external.jpa.model;

import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "protocolo")
public class ProtocoloJpa {

    @SequenceGenerator(name = "protocolo_id_protocolo_seq", sequenceName = "protocolo_id_protocolo_seq", allocationSize = 1)
    @GeneratedValue(generator = "protocolo_id_protocolo_seq", strategy = GenerationType.SEQUENCE)
    @Id
    @Column(name = "id_protocolo")
    private Integer idProtocolo;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "fk_id_estado")
    private Integer idEstado;
    @Column(name = "fecha_subida")
    private LocalDateTime fechaEntrega;
    @Column(name = "nombre_primer_director")
    private String primerDirector;
    @Column(name = "nombre_segundo_director")
    private String segundoDirector;
    @Column(name = "registro")
    private String registro;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "fk_id_estado", referencedColumnName = "id_estado", insertable = false, updatable = false)
    private EstadoProtocoloJpa estadoProtocoloJpa;

        public static ProtocoloJpa fromEntity(Protocolo protocolo){
            return ProtocoloJpa.builder().nombre(protocolo.getTituloProtocolo())
                    .primerDirector(protocolo.getPrimerDirector())
                    .segundoDirector(protocolo.getSegundoDirector())
                    .registro(protocolo.getRegistro()).build();
        }

    public Protocolo toEntity(){
        return Protocolo.builder()
                .registro(registro)
                .tituloProtocolo(nombre)
                .primerDirector(primerDirector)
                .segundoDirector(segundoDirector)
                .build();
    }

}