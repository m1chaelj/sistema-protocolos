#include <string.h>

/**
 * Codigos de error de reglas de negocio de sistema
 */
typedef enum {
    RNS001, // "Campo Obligatorio"
    RNS002, // "Longitud de campo"
    RNS004, // "Maquina de estados"

    RNN001, // "Unicidad de elementos"
    ERROR,  // "Error inesperado"
    /**
     * Errores NO asociados a una regla de negocio
     */
    INVALID_LINK, // "Liga no vigente"
    BAD_REQUEST,  // "Error en la petición"
    NOT_FOUND,    // "Recurso no encontrado"
    NEW_LINK,     // "Nueva liga para registrar contraseña"
    CAPA_PERSISTENCIA, // "Error en la capa de persistencia"
    ERROR_EN_COMUNICACIONES // "Error en la capa de comunicaciones"
} ErrorCodesEnum;

const char *getErrorCodeName(ErrorCodesEnum code) {
    switch (code) {
        case RNS001: return "RNS001";
        case RNS002: return "RNS002";
        case RNS004: return "RNS004";
        case RNN001: return "RNN001";
        case ERROR: return "ERROR";
        case INVALID_LINK: return "INVALID_LINK";
        case BAD_REQUEST: return "BAD_REQUEST";
        case NOT_FOUND: return "NOT_FOUND";
        case NEW_LINK: return "NEW_LINK";
        case CAPA_PERSISTENCIA: return "CAPA_PERSISTENCIA";
        case ERROR_EN_COMUNICACIONES: return "ERROR_EN_COMUNICACIONES";
        default: return "UNKNOWN";
    }
}

const char *getErrorCodeDetail(ErrorCodesEnum code) {
    switch (code) {
        case RNS001: return "Campo Obligatorio";
        case RNS002: return "Longitud de campo";
        case RNS004: return "Maquina de estados";
        case RNN001: return "Unicidad de elementos";
        case ERROR: return "Error inesperado";
        case INVALID_LINK: return "Liga no vigente";
        case BAD_REQUEST: return "Error en la petición";
        case NOT_FOUND: return "Recurso no encontrado";
        case NEW_LINK: return "Nueva liga para registrar contraseña";
        case CAPA_PERSISTENCIA: return "Error en la capa de persistencia";
        case ERROR_EN_COMUNICACIONES: return "Error en la capa de comunicaciones";
        default: return "Detalle desconocido";
    }
}