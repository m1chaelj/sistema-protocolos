package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.EstadoFinalProtocoloRepository;
import mx.com.Escom_TT.Escom.core.entity.EstadoFinalProtocolo;
import mx.com.Escom_TT.Escom.external.jpa.model.EstadoFinalProtocoloJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.EstadoFinalProtocoloJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Optional;

@ApplicationScoped
public class EstadoFinalProtocoloDao implements EstadoFinalProtocoloRepository {

    @Inject
    EstadoFinalProtocoloJpaRepository estadoFinalProtocoloJpaRepository;

    @Override
    public EstadoFinalProtocolo save(EstadoFinalProtocolo estadofinalProtocolo) {
        return estadoFinalProtocoloJpaRepository.saveAndFlush(EstadoFinalProtocoloJpa.fromEntity(estadofinalProtocolo)).toEntity();
    }
    @Override
    public Optional<EstadoFinalProtocolo> findFirstAvailable() {
        return estadoFinalProtocoloJpaRepository
                .findFirstAvailable() // Consulta el primer registro disponible
                .map(EstadoFinalProtocoloJpa::toEntity); // Convierte de JPA a dominio
    }
}
