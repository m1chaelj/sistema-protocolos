package mx.com.Escom_TT.Escom.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Builder
@Getter
@Setter
public class Sinodal {
    private Integer idSinodal;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String correoElectronico;
    private Integer idEstado;
    private String contrasena;
    private Integer idEstadoVerificacion;
    private Integer boleta;
    private String academia;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sinodal sinodal = (Sinodal) o;
        return Objects.equals(idSinodal, sinodal.idSinodal);

    }
}
