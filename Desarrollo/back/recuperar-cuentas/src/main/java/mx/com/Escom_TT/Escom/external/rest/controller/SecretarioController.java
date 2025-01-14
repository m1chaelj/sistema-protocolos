package mx.com.Escom_TT.Escom.external.rest.controller;

import mx.com.Escom_TT.Escom.core.business.input.SecretarioService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/secretario/recuperar")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SecretarioController {

    @Inject
    SecretarioService secretarioService;

    @POST
    @Path("{boleta}")
    public Response recuperarSecretario(@PathParam("boleta") Integer boleta) {

        return secretarioService.recuperar(boleta).map(secretario -> Response.ok("Correo enviado exitosamente").build())
                .getOrElse(Response.status(Response.Status.NOT_FOUND).entity("Secretario no encontrado").build());
    }
}
