package backend.backend.Users.Auth;

import backend.backend.Users.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Usuario usuario;
}