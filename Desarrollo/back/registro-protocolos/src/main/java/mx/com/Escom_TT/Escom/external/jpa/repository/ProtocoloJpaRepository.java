package mx.com.Escom_TT.Escom.external.jpa.repository;

import mx.com.Escom_TT.Escom.external.jpa.model.ProtocoloJpa;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProtocoloJpaRepository extends JpaRepository<ProtocoloJpa, Integer> {
   boolean existsByNombre(String nombre);
}
