package backend.backend.exceptions;

/**
 * Excepción lanzada cuando un usuario autenticado no tiene permisos
 * suficientes para acceder a un recurso.
 */
public class ForbiddenException extends RuntimeException {

    public ForbiddenException(String message) {
        super(message);
    }

    public ForbiddenException(String message, Throwable cause) {
        super(message, cause);
    }
}
