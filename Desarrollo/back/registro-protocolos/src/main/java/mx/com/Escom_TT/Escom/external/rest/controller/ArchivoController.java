package mx.com.Escom_TT.Escom.external.rest.controller;

import mx.com.Escom_TT.Escom.core.business.input.ArchivoService;
import mx.com.Escom_TT.Escom.external.rest.dto.ArchivoDto;
import mx.com.Escom_TT.Escom.external.rest.dto.ArchivoPersistDto;
import mx.com.Escom_TT.util.error.ErrorMapper;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/subir-pdf")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Tag(name = "archivos")
public class ArchivoController {

    @Inject
    ArchivoService archivoService;

    @POST
    @Path("/archivo")
    public Response subirArchivo(@MultipartForm ArchivoPersistDto archivoPersistDto) {
        // Crear el DTO manualmente con los datos recibidos
        ArchivoPersistDto archivoPersistDtos = new ArchivoPersistDto(
                archivoPersistDto.getFileName(),
                archivoPersistDto.getFile()
        );

        return archivoService.uploadFile(
                        archivoPersistDto.getFileName(),
                        archivoPersistDto.getFile(),
                        archivoPersistDto.toEntity()
                )
                .map(ArchivoDto::fromEntity)
                .map(Response::ok)
                .map(Response.ResponseBuilder::build)
                .getOrElseGet(error -> ErrorMapper.errorCodeToResponseBuilder(error).build());
    }
}
