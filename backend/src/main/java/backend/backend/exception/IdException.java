package backend.backend.exception;

public class IdException extends IllegalArgumentException {
    public IdException() {
        super("El ID del producto no puede ser nulo o negativo");
    }
    
}
