package mx.com.Escom_TT.Escom.external.jpa.repository;

import mx.com.Escom_TT.Escom.external.jpa.model.ArchivoJpa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ArchivoJpaRepository extends JpaRepository<ArchivoJpa, Integer> {


}
