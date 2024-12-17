package mx.com.Escom_TT.Escom.external.jpa.dao;

import mx.com.Escom_TT.Escom.core.business.output.SecretarioRepository;
import mx.com.Escom_TT.Escom.core.entity.Secretario;
import mx.com.Escom_TT.Escom.external.jpa.model.SecretarioJpa;
import mx.com.Escom_TT.Escom.external.jpa.repository.SecretarioJpaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class SecretarioDao implements SecretarioRepository {

    @Inject
    SecretarioJpaRepository secretarioJpaRepository;

    @Override
    public Secretario save (Secretario secretario){
        return secretarioJpaRepository.saveAndFlush(SecretarioJpa.fromEntity(secretario)).toEntity();
    }

    @Override
    public boolean validarExisteBoletaSecretario(Integer boleta) {
        return secretarioJpaRepository.existsById(boleta);
    }
}
