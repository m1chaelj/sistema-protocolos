package mx.com.Escom_TT.Escom.core.business.implementation;

import io.vavr.control.Either;
import lombok.extern.slf4j.Slf4j;
import mx.com.Escom_TT.Escom.core.business.input.IntegranteService;
import mx.com.Escom_TT.Escom.core.business.output.IntegranteRepository;
import mx.com.Escom_TT.Escom.core.entity.Integrante;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@Slf4j
@ApplicationScoped
public class IntegranteBs implements IntegranteService {

    @Inject
    IntegranteRepository integranteRepository;

    @Override
    public Either<ErrorCodesEnum, Integrante> create(Integrante entity) {
        // Guardar directamente el usuario
        Integrante integrantePersist = integranteRepository.save(entity);
        return Either.right(integrantePersist);
    }
}
