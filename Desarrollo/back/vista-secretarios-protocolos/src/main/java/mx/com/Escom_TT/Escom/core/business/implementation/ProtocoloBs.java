package mx.com.Escom_TT.Escom.core.business.implementation;

import lombok.extern.slf4j.Slf4j;
import mx.com.Escom_TT.Escom.core.business.input.ProtocoloService;
import mx.com.Escom_TT.Escom.core.business.output.ProtocoloRepository;
import mx.com.Escom_TT.Escom.core.entity.Protocolo;
import mx.com.Escom_TT.Escom.core.entity.Sinodal;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;


@Slf4j
@ApplicationScoped
public class ProtocoloBs implements ProtocoloService {

    @Inject
    ProtocoloRepository protocoloRepository;

    @Override
    public List<Protocolo> busquedaTodosProtocolos() {
        return protocoloRepository.busquedaTodosProtocolos();
    }

    @Override
    public List <Sinodal> busquedaSinodalesAcademia(String academia) {
        return protocoloRepository.busquedaSinodalesAcademia(academia);
    }

    @Override
    public List<Protocolo> mostrarProtocolosEvaluados() {
        return protocoloRepository.mostrarProtocolosEvaluados();
    }


}
