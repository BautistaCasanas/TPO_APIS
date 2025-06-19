package backend.backend.exceptions;

import java.time.LocalDateTime;

/**
 * Clase que representa los detalles de un error para enviar como respuesta HTTP.
 */
public class ErrorDetails {
    private final LocalDateTime timestamp;
    private final String message;
    private final String details;
    private final int statusCode;

    public ErrorDetails(LocalDateTime timestamp, String message, String details, int statusCode) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
        this.statusCode = statusCode;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getMessage() {
        return message;
    }

    public String getDetails() {
        return details;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
