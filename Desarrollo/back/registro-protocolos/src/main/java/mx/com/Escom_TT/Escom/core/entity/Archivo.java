package mx.com.Escom_TT.Escom.core.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Lob;
import java.nio.file.Path;

@Builder
@Getter
@Setter
public class Archivo {

    private Integer id;

    private String fileName; // Nombre del archivo

    @Lob // Indica que este campo puede almacenar un archivo binario grande
    private byte[] archivo; // Contenido binario del archivo

}
