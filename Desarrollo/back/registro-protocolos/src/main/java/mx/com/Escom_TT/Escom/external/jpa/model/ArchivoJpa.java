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
@Table(name = "archivo") // Asegúrate de que la tabla se llama "archivo"
public class ArchivoJpa {

    @Id
    @SequenceGenerator(name = "archivo_id_archivo_seq", sequenceName = "archivo_id_archivo_seq", allocationSize = 1)
    @GeneratedValue(generator = "archivo_id_archivo_seq", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_archivo") // Asegúrate de que el nombre de la columna coincida con la tabla en la base de datos
    private Integer id;

    @Column(name = "nombre") // Asegúrate de que "nombre" sea el nombre correcto de la columna
    private String fileName;

    @Column(name= "archivo")
    private byte[] archivo;

    // Convertir de la entidad de dominio Archivo a la entidad JPA
    public static ArchivoJpa fromEntity(Archivo archivo){
        return ArchivoJpa.builder()
                .fileName(archivo.getFileName())
                .archivo(archivo.getArchivo())
                .build();
    }

    // Convertir de la entidad JPA a la entidad de dominio Archivo
    public Archivo toEntity(){
        return Archivo.builder()
                .id(id)
                .fileName(fileName)
                .archivo(archivo)
                .build();
    }
}
