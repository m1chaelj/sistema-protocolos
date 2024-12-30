package mx.com.Escom_TT.Escom.external.jpa.repository;

import mx.com.Escom_TT.Escom.external.jpa.model.ProtocoloJpa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProtocoloJpaRepository extends JpaRepository<ProtocoloJpa, Integer> {
   boolean existsByNombre(String nombre);
   Optional<ProtocoloJpa> findByIdProtocolo(Integer idProtocolo);

}
