package backend.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PrecioNegativoException.class)
    public ResponseEntity<String> handlePrecioNegativoException(PrecioNegativoException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(ex.getMessage());
    }
    @ExceptionHandler(NombreNuloException.class)
    public ResponseEntity<String> handleNombreNuloException(NombreNuloException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(ex.getMessage());
    }
    @ExceptionHandler(IdException.class)
    public ResponseEntity<String> handleIdException(IdException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(ex.getMessage());
    }
    @ExceptionHandler(ProductoNuloException.class)
    public ResponseEntity<String> handleProductoNuloException(ProductoNuloException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(ex.getMessage());
    }
    
}
