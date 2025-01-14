package mx.com.Escom_TT.Escom.external.jpa.model;

import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Alumno;

import javax.persistence.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "alumno")
public class AlumnoJpa {
    @Id
    @SequenceGenerator(name = "alumno_id_alumno_seq", sequenceName = "alumno_id_alumno_seq", allocationSize = 1)
    @GeneratedValue(generator = "alumno_id_alumno_seq", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_alumno")
    private Integer idAlumno;
    @Column(name = "boleta")
    private Integer boleta;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "apellido_paterno")
    private String apellidoPaterno;
    @Column(name = "apellido_materno")
    private String apellidoMaterno;
    @Column(name = "correo_electronico")
    private String correoElectronico;
    @Column(name= "contrasena")
    private String contrasena;
    @Column(name = "fk_id_estado")
    private Integer idEstado;
    @Column(name="fk_id_estado_verificacion")
    private Integer idEstadoVerificacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "fk_id_estado", referencedColumnName = "id_estado", insertable = false, updatable = false)
    private EstadoAlumnoJpa estadoAlumnoJpa;

    public static AlumnoJpa fromEntity(Alumno alumno){
        return AlumnoJpa.builder().boleta(alumno.getBoleta())
                .contrasena(alumno.getContrasena())
                .correoElectronico(alumno.getCorreoElectronico()).
                nombre(alumno.getNombre()).build();
    }

    public Alumno toEntity(){
        return Alumno.builder()
                .nombre(nombre)
                .contrasena(this.contrasena)
                .correoElectronico(this.correoElectronico)
                .boleta(boleta).build();
    }
}
