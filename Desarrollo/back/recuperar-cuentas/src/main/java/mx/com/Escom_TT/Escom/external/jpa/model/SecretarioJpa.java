package mx.com.Escom_TT.Escom.external.jpa.model;

import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Secretario;

import javax.persistence.*;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "secretario_catt")
public class SecretarioJpa {
    @Id
    @SequenceGenerator(name = "secretario_catt_id_secretario_catt_seq", sequenceName = "secretario_catt_id_secretario_catt_seq", allocationSize = 1)
    @GeneratedValue(generator = "secretario_catt_id_secretario_catt_seq", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_secretario_catt")
    private Integer idSecretario;
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
    private EstadoSecretarioJpa estadoSecretario;


    public static SecretarioJpa fromEntity(Secretario secretario){
        return SecretarioJpa.builder().boleta(secretario.getBoleta())
                .contrasena(secretario.getContrasena())
                .correoElectronico(secretario.getCorreoElectronico()).
                nombre(secretario.getNombre()).build();
    }

    public Secretario toEntity(){
        return Secretario.builder()
                .contrasena(this.contrasena)
                .correoElectronico(this.correoElectronico)
                .nombre(this.nombre)
                .boleta(boleta).build();
    }
}
