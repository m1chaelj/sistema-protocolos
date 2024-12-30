package mx.com.Escom_TT.Escom.external.rest.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import mx.com.Escom_TT.Escom.core.entity.Archivo;

import javax.ws.rs.FormParam;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArchivoDto {
@JsonProperty
private Integer id;
    @FormParam("filePath")
    private String fileName;
    @FormParam("file")
    private String filePath;

    public static ArchivoDto fromEntity(Archivo archivo) {
        return ArchivoDto.builder()
                .id(archivo.getId())
                .fileName(archivo.getFileName())
                .filePath(String.valueOf(archivo.getFilePath()))
                .build();
    }
}
