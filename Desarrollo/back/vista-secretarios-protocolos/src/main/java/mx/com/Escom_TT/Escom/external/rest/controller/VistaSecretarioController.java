package mx.com.Escom_TT.Escom.external.rest.controller;

import io.vavr.control.Either;
import mx.com.Escom_TT.Escom.core.business.input.ProtocoloService;
import mx.com.Escom_TT.Escom.external.rest.dto.*;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;
import mx.com.Escom_TT.util.error.ErrorMapper;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.stream.Collectors;



@Path("/secretario/vista-distribucion-protocolos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Gestion de usuarios")
public class VistaSecretarioController {

    @Inject
    ProtocoloService protocoloService;



    @GET
    public Response todosProtocolos() {
        var protocolos = protocoloService.busquedaTodosProtocolos().stream().map(ProtocoloDto::fromEntity).collect(Collectors.toList());
        return Response.ok(protocolos).build();
    }

    @GET
    @Path("/sinodales/{academia}")
    public Response sinodalesProtocolos(@PathParam("academia") String academia) {
        var sinodal= protocoloService.busquedaSinodalesAcademia(academia).stream().map(SinodalDto::fromEntity).collect(Collectors.toList());
        return Response.ok(sinodal).build();
    }

    @GET
    @Path("recepcion/evaluacion")
    public Response recepcionEvaluacion() {
        var evaluacion= protocoloService.mostrarProtocolosEvaluados().stream().map(EvaluacionDto::fromEntity).collect(Collectors.toList());
        return Response.ok(evaluacion).build();

    }

}
