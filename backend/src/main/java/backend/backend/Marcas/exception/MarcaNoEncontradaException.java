package backend.backend.Marcas.exception;

public class MarcaNoEncontradaException extends RuntimeException {
    public MarcaNoEncontradaException(Long id) {
        super("Marca con ID " + id + " no encontrada");
    }
}
