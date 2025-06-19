package backend.backend.Users.service;

import backend.backend.Users.model.Usuario;
import backend.backend.Users.repository.UsuarioRepository;
import backend.backend.dto.UsuarioDTO;
import backend.backend.exceptions.BadRequestException;
import backend.backend.exceptions.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UsuarioRepository userRepository;

    public Usuario updateUsuario(int id, UsuarioDTO usuario) {
        Usuario existente = userRepository.findById(Long.valueOf(id))
            .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));

        if (usuario.getName() == null || usuario.getName().isBlank()) {
            throw new BadRequestException("Nombre inválido");
        }
        if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
            throw new BadRequestException("Email inválido");
        }
        existente.setName(usuario.getName());
        existente.setEmail(usuario.getEmail());
        existente.setPhone(usuario.getPhone());
        try {
            return userRepository.save(existente);
        } catch (Exception e) {
            throw new RuntimeException("Error al actualizar el usuario", e);
        }
    }

    public UsuarioDTO getUsuarioById(int id) {
        return userRepository.findById(Long.valueOf(id)).map(usuario -> {
            return UsuarioDTO.builder()
                .id(usuario.getId())
                .name(usuario.getName())
                .email(usuario.getEmail())
                .phone(usuario.getPhone())
                .build();
        })
            .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
    }
}
