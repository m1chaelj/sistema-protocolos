package mx.com.Escom_TT.util.error;

public enum ErrorCodesEnum {
    /**
     * Codigos de error de reglas de negocio de sistema
     */
    RNS001("Campo Obligatorio"),
    RNS002("Longitud de campo"),
    RNS004("Maquina de estados"),
    RNN002("Formato invalido para correo electronico"),
    RNN001("Unicidad de elementos"),
    ERROR("Error inesperado"),
    /**
     * Errores NO asociados a una regla de negocio
     */
    INVALID_LINK("Liga no vigente"),
    BAD_REQUEST("Error en la petición"),
    NOT_FOUND("Recurso no encontrado"),
    NEW_LINK("Nueva liga para registrar contraseña"),
    CAPA_PERSISTENCIA("Error en la capa de persistencia"),
    ERROR_EN_COMUNICACIONES("Error en la capa de comunicaciones");

    private final String detail;

    ErrorCodesEnum(String detail) {
        this.detail = detail;
    }

    public String getName() {
        return this.name();
    }

    public String getDetail() {
        return detail;
    }

}
