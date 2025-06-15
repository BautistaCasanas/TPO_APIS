package backend.backend.Users.service;

import backend.backend.Users.model.Usuario;
import backend.backend.Users.repository.UsuarioRepository;
import backend.backend.dto.UsuarioDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class UserService {

    @Autowired
    private UsuarioRepository userRepository;

    public Usuario updateUsuario(int id, UsuarioDTO usuario) {
        try {
            Usuario existente = userRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

            if (usuario.getName() == null || usuario.getName().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nombre inválido");
            }

            if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email inválido");
            }

            existente.setName(usuario.getName());
            existente.setEmail(usuario.getEmail());
            existente.setPhone(usuario.getPhone());

            return userRepository.save(existente);

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar el usuario", e);
        }
    }

    public UsuarioDTO getUsuarioById(int id) {
        try {
            return userRepository.findById(Long.valueOf(id)).map(usuario -> {
                return UsuarioDTO.builder()
                    .id(usuario.getId())
                    .name(usuario.getName())
                    .email(usuario.getEmail())
                    .phone(usuario.getPhone())
                    .build();
            })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el usuario", e);
        }
    }
}
