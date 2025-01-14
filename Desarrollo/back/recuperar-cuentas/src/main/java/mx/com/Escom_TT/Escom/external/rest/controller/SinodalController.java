package mx.com.Escom_TT.Escom.external.rest.controller;

import mx.com.Escom_TT.Escom.core.business.input.SinodalService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/sinodal/recuperar")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SinodalController {

    @Inject
    SinodalService sinodalService;


    @POST
    @Path("{boleta}")
    public Response recuperarSinodal(@PathParam("boleta") Integer boleta) {
        return sinodalService.recuperar(boleta).map(sinodal-> Response.ok("Correo enviado exitosamente").build())
                .getOrElse(Response.status(Response.Status.NOT_FOUND).entity("Sinodal no encontrado").build());
    }
}
