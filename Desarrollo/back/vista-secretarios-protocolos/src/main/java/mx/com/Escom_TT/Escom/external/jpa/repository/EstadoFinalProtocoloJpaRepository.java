package mx.com.Escom_TT.Escom.external.jpa.repository;

import mx.com.Escom_TT.Escom.external.jpa.model.EstadoFinalProtocoloJpa;
import org.jboss.logging.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EstadoFinalProtocoloJpaRepository extends JpaRepository<EstadoFinalProtocoloJpa, Integer> {

    @Query("SELECT e FROM EstadoFinalProtocoloJpa e " +
            "WHERE (e.nombreSinodal IS NULL OR e.nombreSinodal = :nombreSinodal) " +
            "AND (e.academia IS NULL OR e.academia = :academia) " +
            "ORDER BY e.idDecision ASC")
    Optional<EstadoFinalProtocoloJpa> findFirstAvailable();

}
