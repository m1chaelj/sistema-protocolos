package mx.com.Escom_TT.Escom.external.rest.dto;

import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Archivo;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

import javax.ws.rs.FormParam;
import javax.ws.rs.core.MediaType;
import java.io.InputStream;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RegisterForReflection
public class UpdateArchivoDto {


    @FormParam("file")
    @PartType(MediaType.APPLICATION_OCTET_STREAM)
    private byte[] file;

    // Convertir DTO en entidad Archivo
    public Archivo toEntity() {
        return Archivo.builder()
                .archivo(file)
                .build();
    }
}
