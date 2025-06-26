package backend.backend.exception;

public  class PrecioNegativoException extends IllegalArgumentException {
    public PrecioNegativoException() {
        super("El precio del producto no puede ser negativo");
    }
    
}
