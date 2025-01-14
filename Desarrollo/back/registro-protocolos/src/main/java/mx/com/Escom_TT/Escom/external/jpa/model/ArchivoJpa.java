package mx.com.Escom_TT.Escom.external.jpa.model;

import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Archivo;

import javax.persistence.*;
import java.nio.file.Path;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "archivo")
public class ArchivoJpa {


    @SequenceGenerator(name = "archivo_id_archivo_seq", sequenceName = "archivo_id_archivo_seq", allocationSize = 1)
    @GeneratedValue(generator = "archivo_id_archivo_seq", strategy = GenerationType.SEQUENCE)
    @Id
    @Column(name = "id_archivo")
    private Integer id;

    @Column(name = "nombre")
    private String fileName;

    @Column(name= "archivo")
    private byte[] archivo;

    public static ArchivoJpa fromEntity(Archivo archivo){
        return ArchivoJpa.builder()
                .fileName(archivo.getFileName())
                .archivo(archivo.getArchivo())
                .build();
    }

    public Archivo toEntity(){
        return Archivo.builder()
                .id(id)
                .fileName(fileName)
                .archivo(archivo)
                .build();
    }
}
