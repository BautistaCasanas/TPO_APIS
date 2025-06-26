package backend.backend.exception;

public class NombreNuloException extends IllegalArgumentException {
    public NombreNuloException() {
        super("El producto debe tener un nombre");
    }
}
