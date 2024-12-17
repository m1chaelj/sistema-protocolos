package mx.com.Escom_TT.Escom.core.business.output;

import mx.com.Escom_TT.Escom.core.entity.Sinodal;

public interface SinodalRepository {

    Sinodal save (Sinodal sinodal);
    boolean validarExisteBoletaSinodal(Integer boleta);

}
