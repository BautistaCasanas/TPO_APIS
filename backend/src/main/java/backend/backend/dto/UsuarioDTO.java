package backend.backend.dto;
import backend.backend.Users.Role.Role;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UsuarioDTO {
    Long id;
    String name;
    String email;
    String phone;
    Role role;
    String token;
}
