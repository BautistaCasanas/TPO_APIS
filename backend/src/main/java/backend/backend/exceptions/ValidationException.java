package backend.backend.exceptions;

import java.util.Map;

/**
 * Excepción para manejar errores de validación de datos de forma más específica.
 */
public class ValidationException extends RuntimeException {
    
    private final Map<String, String> errors;

    public ValidationException(String message, Map<String, String> errors) {
        super(message);
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
