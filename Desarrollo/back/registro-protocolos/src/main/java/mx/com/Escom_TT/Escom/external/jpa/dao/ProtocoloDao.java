package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.ProtocoloRepository;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;
import mx.com.Escom_TT.Escom.external.jpa.model.ProtocoloJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.ProtocoloJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class ProtocoloDao implements ProtocoloRepository {

    @Inject
    ProtocoloJpaRepository protocoloJpaRepository;

    @Override
    public Protocolo save (Protocolo protocolo){
        return protocoloJpaRepository.saveAndFlush(ProtocoloJpa.fromEntity(protocolo)).toEntity();
    }

    @Override
    public boolean existsByNombre(String nombre) {
        return protocoloJpaRepository.existsByNombre(nombre);
    }


}
