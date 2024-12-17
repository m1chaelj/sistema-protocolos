package mx.com.Escom_TT.Escom.external.rest.controller;

import mx.com.Escom_TT.Escom.core.business.input.AlumnoService;
import mx.com.Escom_TT.Escom.core.business.input.SecretarioService;
import mx.com.Escom_TT.Escom.core.business.input.SinodalService;
import mx.com.Escom_TT.Escom.external.rest.dto.*;
import mx.com.Escom_TT.util.error.ErrorMapper;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/registrarse")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Gestion de usuarios")
public class RegistroController {

    @Inject
    AlumnoService alumnoService;
    @Inject
    SecretarioService secretarioService;
    @Inject
    SinodalService sinodalService;

    @POST
    @Path("/estudiante")
    public Response create(@Valid AlumnoPersistDto alumnopersistdto){
        return alumnoService.create(alumnopersistdto.toEntity()).map(AlumnoDto::fromEntity).map(Response::ok)
                .getOrElseGet(ErrorMapper::errorCodeToResponseBuilder).build();
    }
    @POST
    @Path("/sinodal")
    public Response create(@Valid SinodalPersistDto sinodalpersistdto){
        return sinodalService.create(sinodalpersistdto.toEntity()).map(SinodalDto::fromEntity).map(Response::ok)
                .getOrElseGet(ErrorMapper::errorCodeToResponseBuilder).build();
    }
    @POST
    @Path("/secretario")
    public Response create(@Valid SecretarioPersistDto secretariopersistdto){
        return secretarioService.create(secretariopersistdto.toEntity()).map(SecretarioDto::fromEntity).map(Response::ok)
                .getOrElseGet(ErrorMapper::errorCodeToResponseBuilder).build();
    }
}
