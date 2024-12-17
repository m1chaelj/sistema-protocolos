package mx.com.Escom_TT.Escom.external.jpa.model;

import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;

import javax.persistence.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sinodal")

public class SinodalJpa{

    @Id
    @SequenceGenerator(name = "sinodal_id_sinodal_seq", sequenceName = "sinodal_id_sinodal_seq", allocationSize = 1)
    @GeneratedValue(generator = "sinodal_id_sinodal_seq", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_sinodal")
    private Integer idSinodal;
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
    private String contraseña;
    @Column(name = "fk_id_estado")
    private Integer idEstado;
    @Column(name="fk_id_estado_verificacion")
    private Integer idEstadoVerificacion;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "fk_id_estado", referencedColumnName = "id_estado", insertable = false, updatable = false)
    private EstadoSinodalJpa estadoSinodal;


    public static SinodalJpa fromEntity(Sinodal sinodal) {
        return SinodalJpa.builder().idSinodal(sinodal.getIdSinodal()).boleta(sinodal.getBoleta())
                .apellidoPaterno(sinodal.getApellidoPaterno()).apellidoMaterno(sinodal.getApellidoMaterno())
                .contraseña(sinodal.getContrasena())
                .correoElectronico(sinodal.getCorreoElectronico()).
                nombre(sinodal.getNombre()).idEstado(sinodal.getIdEstado()).idEstadoVerificacion(sinodal.getIdEstadoVerificacion()).build();
    }

    public Sinodal toEntity(){
        return Sinodal.builder().idSinodal(this.idSinodal)
                .apellidoMaterno(this.apellidoMaterno)
                .contrasena(this.contraseña)
                .apellidoPaterno(this.apellidoPaterno)
                .correoElectronico(this.correoElectronico)
                .idEstado(this.idEstado).nombre(this.nombre)
                .idEstadoVerificacion(idEstadoVerificacion).boleta(boleta).build();
    }
}
