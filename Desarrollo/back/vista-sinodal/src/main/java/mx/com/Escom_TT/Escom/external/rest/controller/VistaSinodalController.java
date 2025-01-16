package mx.com.Escom_TT.Escom.external.rest.controller;

import mx.com.Escom_TT.Escom.core.business.input.ProtocoloService;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;
import mx.com.Escom_TT.Escom.external.rest.dto.ProtocoloDto;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;


@Path("/sinodal/protocolos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Gestion protocolos-vista-sinodal")
public class VistaSinodalController {


    @Inject
    ProtocoloService protocoloService;

    @GET
    @Path("{academia}")
    public Response getProtocolosAcademia(@PathParam("academia") String academia) {
        List<Protocolo> protocolos = protocoloService.BuscarAcademia(academia);
        if (protocolos.isEmpty()) {
            return Response.status(404).build();
        }
        return Response.ok(protocolos).build();
    }

}
