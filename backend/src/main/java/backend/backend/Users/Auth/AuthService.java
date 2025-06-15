package backend.backend.Users.Auth;

import backend.backend.Users.Role.Role;
import backend.backend.Users.model.Usuario;
import backend.backend.Security.JwtUtil;
import backend.backend.Users.repository.UsuarioRepository;
import backend.backend.dto.LoginRequest;
import backend.backend.dto.RegisterRequest;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtService;
    private final AuthenticationManager authenticationManager;

    public String register(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("Ya existe un usuario con ese email");
        }

        Usuario usuario = Usuario.builder()
                .name(request.getNombre())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        usuarioRepository.save(usuario);
        String jwtToken = jwtService.generateToken(
                usuario.getEmail(),
                usuario.getRoles()
        );

        return jwtToken;
    }

    public AuthResponse authenticate(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        var user = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow();
        String jwtToken = jwtService.generateToken(
                user.getEmail(),
                user.getRoles()
        );

        

        return new AuthResponse(jwtToken, user);
    }


}
