package backend.backend.exceptions;

/**
 * Excepción lanzada cuando la solicitud del usuario contiene datos inválidos
 * o malformados.
 */
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
