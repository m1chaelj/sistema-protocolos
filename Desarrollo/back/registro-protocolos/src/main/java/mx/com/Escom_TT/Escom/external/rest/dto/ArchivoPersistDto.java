package mx.com.Escom_TT.Escom.external.rest.dto;

import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Archivo;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

import javax.ws.rs.FormParam;
import javax.ws.rs.core.MediaType;
import java.io.InputStream;
import java.nio.file.Path;



@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RegisterForReflection
public class ArchivoPersistDto {

    @FormParam("fileName")
    @PartType(MediaType.TEXT_PLAIN)
    private String fileName;

    @FormParam("file")
    @PartType(MediaType.APPLICATION_OCTET_STREAM)
    private InputStream file;

    // Convertir DTO en entidad Archivo
    public Archivo toEntity() {
        return Archivo.builder()
                .fileName(fileName)
                .build(); // Si filePath es generado en el servicio, elimínalo aquí
    }
}
