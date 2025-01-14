package mx.com.Escom_TT.Escom.external.rest.controller;



import mx.com.Escom_TT.Escom.core.business.input.AlumnoService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/alumno/recuperar")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AlumnoController {

    @Inject
    AlumnoService alumnoService;

    @POST
    @Path("{boleta}")
    public Response recuperar(@PathParam("boleta") Integer boleta) {
        return alumnoService.recuperar(boleta)
                .map(alumno -> Response.ok("Correo enviado exitosamente").build())
                .getOrElse(Response.status(Response.Status.NOT_FOUND).entity("Alumno no encontrado").build());
    }



}
