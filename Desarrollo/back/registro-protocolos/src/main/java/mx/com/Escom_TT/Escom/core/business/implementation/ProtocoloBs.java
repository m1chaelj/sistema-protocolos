package mx.com.Escom_TT.Escom.core.business.implementation;

import io.vavr.control.Either;
import lombok.extern.slf4j.Slf4j;
import mx.com.Escom_TT.Escom.core.business.input.ProtocoloService;
import mx.com.Escom_TT.Escom.core.business.output.ProtocoloRepository;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;
import mx.com.Escom_TT.util.error.ErrorCodesEnum;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@ApplicationScoped
public class ProtocoloBs implements ProtocoloService {

        @Inject
        ProtocoloRepository protocoloRepository;


        private Map<String, Integer> secuencias = new HashMap<>();

        @Override
        public Either<ErrorCodesEnum, Protocolo> create(Protocolo entity) {
            Either<ErrorCodesEnum, Protocolo> result;

            if (validarNombre(entity.getNombre())) {
                result = Either.left(ErrorCodesEnum.RNN006);
            } else {
                String identificador = generarIdentificador();
                entity.setRegistro(identificador);
                entity.setIdEstado(1);
                entity.setFechaEntrega(LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES));

                var protocoloPersist = protocoloRepository.save(entity);
                result = Either.right(protocoloPersist);
            }

            return result;
        }

    @Override
    public List<Protocolo>findByNombreProtocolo(String nombre) {
        return protocoloRepository.findByNombreProtocolo(nombre);
    }


    private String generarIdentificador() {
            LocalDate fechaActual = LocalDate.now();
            String año = String.valueOf(fechaActual.getYear());
            String semestre = (fechaActual.getMonthValue() <= 6) ? "1" : "2";

            String secuencia = obtenerSecuenciaIdentificador(año, semestre);

            return año + "-" + semestre + "-" + secuencia;
        }

        private String obtenerSecuenciaIdentificador(String año, String semestre) {
            String clave = año + "-" + semestre;

            int numeroSecuencia = secuencias.getOrDefault(clave, 0) + 1;

            secuencias.put(clave, numeroSecuencia);

            return String.format("%03d", numeroSecuencia);
        }


        private boolean validarNombre(String nombre) {
            return protocoloRepository.existsByNombre(nombre);

        }



    }

