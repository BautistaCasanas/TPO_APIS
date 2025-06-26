package backend.backend.exception;

public class ProductoNuloException extends IllegalArgumentException {
    public ProductoNuloException() {
        super("El producto no puede ser nulo");
    }
    
}
