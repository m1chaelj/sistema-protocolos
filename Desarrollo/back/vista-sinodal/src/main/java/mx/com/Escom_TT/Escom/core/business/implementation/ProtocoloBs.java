package mx.com.Escom_TT.Escom.core.business.implementation;

import mx.com.Escom_TT.Escom.core.business.input.ProtocoloService;
import mx.com.Escom_TT.Escom.core.business.output.ProtocoloRepository;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class ProtocoloBs implements ProtocoloService {


    @Inject
    ProtocoloRepository protocoloRepository;

    @Override
    public Optional<Protocolo> BuscarAcademia(String academia) {
        if (!List.of("ACC", "IA", "ACS").contains(academia)) {
            return Optional.empty();
        }

        return protocoloRepository.BuscarAcademia(academia);
    }
}

