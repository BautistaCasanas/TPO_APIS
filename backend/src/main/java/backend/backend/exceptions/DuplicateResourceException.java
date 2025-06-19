package backend.backend.exceptions;

/**
 * Excepción lanzada cuando se intenta crear un recurso que ya existe.
 */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }

    public DuplicateResourceException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("Ya existe un %s con %s: '%s'", resourceName, fieldName, fieldValue));
    }
}
