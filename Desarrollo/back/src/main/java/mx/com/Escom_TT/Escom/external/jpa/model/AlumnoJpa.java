package mx.com.Escom_TT.Escom.external.jpa.model;

import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Alumno")
public class AlumnoJpa {
    @Id
    @SequenceGenerator(name = "Alumno_id_alumno_seq", sequenceName = "Alumno_id_alumno_seq", allocationSize = 1)
    @GeneratedValue(generator = "Alumno_id_alumno_seq", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_alumno")
    private Integer idAlumno;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "apellido_paterno")
    private String apellidoPaterno;
    @Column(name = "apellido_materno")
    private String apellidoMaterno;
    @Column(name = "correo electronico")
    private String correoElectronico;
    @Column(name= "contrasena")
    private String contraseña;
    @Column(name = "fk_id_estado")
    private Integer idEstado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "fk_id_estado", referencedColumnName = "id_estado", insertable = false, updatable = false)
    private EstadoAlumnoJpa estadoAlumnoJpa;

}
