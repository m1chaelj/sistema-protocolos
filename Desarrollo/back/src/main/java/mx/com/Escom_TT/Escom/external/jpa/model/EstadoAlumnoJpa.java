package mx.com.Escom_TT.Escom.external.jpa.model;
import javax.persistence.*;
import lombok.*;
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Estado_alumno")
public class EstadoAlumnoJpa {
    @Id
    @SequenceGenerator(name = "Estado_Alumno_id_estado_seq", sequenceName = "Estado_Alumno_id_estado_seq", allocationSize = 1)
    @GeneratedValue(generator = "Estado_Alumno_id_estado_seq", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_estado")
    private Integer idEstado;
    @Column(name = "nombre")
    private String nombre;
}
