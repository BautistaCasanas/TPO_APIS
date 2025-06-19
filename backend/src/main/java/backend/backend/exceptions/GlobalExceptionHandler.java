package backend.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Manejador global de excepciones que convierte las excepciones
 * de dominio en respuestas HTTP adecuadas.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleResourceNotFoundException(
            ResourceNotFoundException exception,
            WebRequest request) {
        return createErrorResponse(exception.getMessage(), request, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorDetails> handleBadRequestException(
            BadRequestException exception,
            WebRequest request) {
        return createErrorResponse(exception.getMessage(), request, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorDetails> handleUnauthorizedException(
            UnauthorizedException exception,
            WebRequest request) {
        return createErrorResponse(exception.getMessage(), request, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorDetails> handleForbiddenException(
            ForbiddenException exception,
            WebRequest request) {
        return createErrorResponse(exception.getMessage(), request, HttpStatus.FORBIDDEN);
    }    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorDetails> handleDuplicateResourceException(
            DuplicateResourceException exception,
            WebRequest request) {
        return createErrorResponse(exception.getMessage(), request, HttpStatus.CONFLICT);
    }
    
    @ExceptionHandler(OperationNotAllowedException.class)
    public ResponseEntity<ErrorDetails> handleOperationNotAllowedException(
            OperationNotAllowedException exception,
            WebRequest request) {
        return createErrorResponse(exception.getMessage(), request, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleGenericException(
            Exception exception,
            WebRequest request) {
        String errorMessage = "Ha ocurrido un error inesperado";
        return createErrorResponse(errorMessage, request, HttpStatus.INTERNAL_SERVER_ERROR);
    }    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("errores", errors);
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<Object> handleValidationException(
            ValidationException exception) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("message", exception.getMessage());
        response.put("errores", exception.getErrors());
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<ErrorDetails> createErrorResponse(
            String errorMessage,
            WebRequest request,
            HttpStatus status) {
        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                errorMessage,
                request.getDescription(false),
                status.value()
        );
        return new ResponseEntity<>(errorDetails, status);
    }
}
