package mx.com.Escom_TT.Escom.core.business.implementation;

import io.vavr.control.Either;
import lombok.extern.slf4j.Slf4j;
import mx.com.Escom_TT.Escom.core.business.input.EstadoFinalProtocoloService;
import mx.com.Escom_TT.Escom.core.business.output.EstadoFinalProtocoloRepository;
import mx.com.Escom_TT.Escom.core.entity.EstadoFinalProtocolo;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Optional;

@ApplicationScoped
@Slf4j
public class EstadoFinalProtocoloBs implements EstadoFinalProtocoloService {

    @Inject
    EstadoFinalProtocoloRepository estadoFinalProtocoloRepository;

    @Override
    public Either<ErrorCodesEnum, EstadoFinalProtocolo> create(EstadoFinalProtocolo entity) {
        Either<ErrorCodesEnum, EstadoFinalProtocolo> result;

        if (entity.getNombreSinodal() == null || entity.getAcademia() == null) {
            result = Either.left(ErrorCodesEnum.RNS001);
        } else {
            // Buscar el siguiente registro disponible
            Optional<EstadoFinalProtocolo> registroDisponible = estadoFinalProtocoloRepository.findFirstAvailable();

            if (registroDisponible.isPresent()) {
                // Actualizar los campos del registro encontrado
                EstadoFinalProtocolo registro = registroDisponible.get();
                registro.setNombreSinodal(entity.getNombreSinodal());
                registro.setAcademia(entity.getAcademia());

                var estadoActualizado = estadoFinalProtocoloRepository.save(registro);
                result = Either.right(estadoActualizado);
            } else {
                // Si no hay registros disponibles, retornar error
                result = Either.left(ErrorCodesEnum.RNS002); // Código de error para "No hay registros disponibles"
            }
        }

        return result;
    }

}
