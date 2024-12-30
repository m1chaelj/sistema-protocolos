package mx.com.Escom_TT.Escom.external.rest.controller;
import mx.com.Escom_TT.Escom.core.business.input.AlumnoService;
import mx.com.Escom_TT.Escom.core.business.input.SecretarioService;
import mx.com.Escom_TT.Escom.core.business.input.SinodalService;
import mx.com.Escom_TT.Escom.external.rest.dto.InicioAlumno;
import mx.com.Escom_TT.Escom.external.rest.dto.InicioSecretario;
import mx.com.Escom_TT.Escom.external.rest.dto.InicioSinodal;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/inicio")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Inicio de usuarios")
public class    InicioController {

    @Inject
    AlumnoService alumnoService;

    @POST
    @Path("/estudiante")
    public Response inicio(@Valid InicioAlumno alumno) {
        return alumnoService.InicioSesion(alumno.toEntity())
                .map(resultado -> Response.ok(true).build())
                .getOrElse(Response.status(Response.Status.UNAUTHORIZED).entity(false).build());
    }

    @Inject
    SinodalService sinodalService;

    @POST
    @Path("/sinodal")
    public Response inicio(@Valid InicioSinodal sinodal) {
        return sinodalService.InicioSesion(sinodal.toEntity())
                .map(resultado -> Response.ok(true).build())
                .getOrElse(Response.status(Response.Status.UNAUTHORIZED).entity(false).build());
    }

    @Inject
    SecretarioService secretarioService;

    @POST
    @Path("/secretario")
    public Response inicio(@Valid InicioSecretario secretario) {
        return secretarioService.InicioSesion(secretario.toEntity())
                .map(resultado -> Response.ok(true).build())
                .getOrElse(Response.status(Response.Status.UNAUTHORIZED).entity(false).build());
    }

}
