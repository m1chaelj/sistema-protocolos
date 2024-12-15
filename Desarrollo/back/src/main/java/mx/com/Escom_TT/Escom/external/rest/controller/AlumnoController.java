package mx.com.Escom_TT.Escom.external.rest.controller;

import mx.com.Escom_TT.Escom.core.business.input.AlumnoService;
import mx.com.Escom_TT.Escom.external.rest.dto.AlumnoDto;
import mx.com.Escom_TT.Escom.external.rest.dto.AlumnoPersistDto;
import mx.com.Escom_TT.util.error.ErrorMapper;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/ingreso")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Gestion de usuarios")
public class AlumnoController {

    @Inject
    AlumnoService alumnoService;
    @POST
    @Path("/estudiante")
    public Response create(@Valid AlumnoPersistDto alumnopersistdto){
        return alumnoService.create(alumnopersistdto.toEntity()).map(AlumnoDto::fromEntity).map(Response::ok)
                .getOrElseGet(ErrorMapper::errorCodeToResponseBuilder).build();
    }
}
