package mx.com.Escom_TT.Escom.external.jpa.model;

import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Integrante;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;

import javax.persistence.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "integrantes")
public class IntegranteJpa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_integrante")
    private Integer idIntegrante;
    @Column(name = "fk_id_protocolo")
    private Integer idProtocolo;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "boleta")
    private Integer boleta;
    @Column(name = "fk_id_alumno")
    private Integer idAlumno;
    @Column(name="nombre_segundo_integrante")
    private String nombreSegundoIntegrante;
    @Column(name="boleta_segundo_integrante")
    private Integer boletaSegundoIntegrante;



    public static IntegranteJpa fromEntity(Integrante integrante) {
        return IntegranteJpa.builder()
                .idIntegrante(integrante.getIdIntegrante())
                .idProtocolo(integrante.getIdProtocolo())
                .nombre(integrante.getNombre())
                .boleta(integrante.getBoleta())
                .idAlumno(integrante.getIdAlumno())
                .nombreSegundoIntegrante(integrante.getNombreSegundoIntegrante())
                .boletaSegundoIntegrante(integrante.getBoletaSegundoIntegrante())
                .build();
    }

public Integrante toEntity() {
        return Integrante.builder()
                .idIntegrante(this.idIntegrante)
                .idProtocolo(this.idProtocolo)
                .nombre(this.nombre)
                .boleta(this.boleta)
                .IdAlumno(this.idAlumno)
                .nombreSegundoIntegrante(this.nombreSegundoIntegrante)
                .boletaSegundoIntegrante(this.boletaSegundoIntegrante)
                .build();
}


}
