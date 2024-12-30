package mx.com.Escom_TT.Escom.external.rest.controller;
import mx.com.Escom_TT.Escom.core.business.input.IntegranteService;
import mx.com.Escom_TT.Escom.core.business.input.ProtocoloService;
import mx.com.Escom_TT.Escom.external.rest.dto.IntegranteDto;
import mx.com.Escom_TT.Escom.external.rest.dto.IntegrantePersistDto;
import mx.com.Escom_TT.Escom.external.rest.dto.ProtocoloDto;
import mx.com.Escom_TT.Escom.external.rest.dto.ProtocoloPersistDto;
import mx.com.Escom_TT.util.error.ErrorMapper;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.jboss.logging.annotations.Pos;

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

    @Inject
    IntegranteService integranteService;

    @POST
    @Path("/estudiante")
    public Response create(@Valid ProtocoloPersistDto protocoloPersistDto) {
        return protocoloService.create(protocoloPersistDto.toEntity())
                .map(ProtocoloDto::fromEntity)
                .map(Response::ok)
                .map(Response.ResponseBuilder::build)
                .getOrElseGet(error -> ErrorMapper.errorCodeToResponseBuilder(error).build());
    }

    @POST
    @Path("/integrantes")
    public Response create(@Valid IntegrantePersistDto integrantePersistDto) {
        return integranteService.create(integrantePersistDto.toEntity())
                .map(IntegranteDto::fromEntity).map(Response::ok).map(Response.ResponseBuilder::build)
                .getOrElseGet(error -> ErrorMapper.errorCodeToResponseBuilder(error).build());

    }


}
