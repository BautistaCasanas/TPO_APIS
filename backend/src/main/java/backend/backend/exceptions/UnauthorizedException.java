package backend.backend.exceptions;

/**
 * Excepción lanzada cuando se intenta acceder a recursos sin autenticación válida.
 */
public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException(String message) {
        super(message);
    }

    public UnauthorizedException(String message, Throwable cause) {
        super(message, cause);
    }
}
