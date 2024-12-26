package mx.com.Escom_TT.Escom.external.jpa.repository;

import mx.com.Escom_TT.Escom.external.jpa.model.SinodalJpa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SinodalJpaRepository extends JpaRepository<SinodalJpa,Integer> {
    boolean existsByBoletaAndContrasena(Integer boleta, String contrasena);
}
