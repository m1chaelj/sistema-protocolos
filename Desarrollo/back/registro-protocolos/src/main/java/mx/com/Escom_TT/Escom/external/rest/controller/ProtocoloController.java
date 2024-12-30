package mx.com.Escom_TT.Escom.external.rest.controller;
import mx.com.Escom_TT.Escom.core.business.input.ProtocoloService;
import mx.com.Escom_TT.Escom.external.rest.dto.ProtocoloDto;
import mx.com.Escom_TT.Escom.external.rest.dto.ProtocoloPersistDto;
import mx.com.Escom_TT.util.error.ErrorMapper;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/registro-protocolo")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Gestion de protocolos")
public class ProtocoloController {

    @Inject
     ProtocoloService protocoloService;

    @POST
    @Path("/estudiante")
    public Response create(@Valid ProtocoloPersistDto protocoloPersistDto) {
        return protocoloService.create(protocoloPersistDto.toEntity())
                .map(ProtocoloDto::fromEntity)
                .map(Response::ok)
                .map(Response.ResponseBuilder::build) // Convierte el ResponseBuilder en Response
                .getOrElseGet(error -> ErrorMapper.errorCodeToResponseBuilder(error).build());
    }


}
