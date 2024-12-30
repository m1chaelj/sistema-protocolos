package mx.com.Escom_TT.Escom.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;
@Builder
@Getter
@Setter
public class Secretario {
    private Integer idSecretario;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String correoElectronico;
    private Integer idEstado;
    private String contrasena;
    private Integer idEstadoVerificacion;
    private Integer boleta;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Secretario secretario = (Secretario) o;
        return Objects.equals(idSecretario, secretario.idSecretario);

    }
}
