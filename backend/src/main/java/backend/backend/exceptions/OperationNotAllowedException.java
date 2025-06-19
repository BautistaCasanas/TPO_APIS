package backend.backend.exceptions;

/**
 * Excepción lanzada cuando se intenta realizar una operación que no está permitida
 * debido a reglas de negocio o del estado actual del sistema.
 */
public class OperationNotAllowedException extends RuntimeException {

    public OperationNotAllowedException(String message) {
        super(message);
    }

    public OperationNotAllowedException(String message, Throwable cause) {
        super(message, cause);
    }
}
