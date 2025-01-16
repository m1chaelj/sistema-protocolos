package mx.com.Escom_TT.Escom.external.rest.controller;

import mx.com.Escom_TT.Escom.core.business.input.PreguntasService;
import mx.com.Escom_TT.Escom.core.entity.Preguntas;
import mx.com.Escom_TT.Escom.external.rest.dto.PreguntasDto;
import mx.com.Escom_TT.Escom.external.rest.dto.PreguntasPersistDto;
import mx.com.Escom_TT.util.error.ErrorMapper;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/calificar")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PreguntasController {

    @Inject
    PreguntasService preguntasService;


    @POST
    public Response recuperarSinodal(@Valid PreguntasPersistDto preguntasPersistDto) {

        return preguntasService.crearPreguntas(preguntasPersistDto.toEntity()).map(PreguntasDto::fromEntity).map(Response::ok)
                .getOrElseGet(ErrorMapper::errorCodeToResponseBuilder).build();

    }
}
