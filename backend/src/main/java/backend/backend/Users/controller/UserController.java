package backend.backend.Users.controller;

import backend.backend.Users.model.Usuario;
import backend.backend.Users.service.UserService;
import backend.backend.dto.UsuarioDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService usuarioService;

    // PUT: http://localhost:8081/api/users/{id}
    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable int id, @RequestBody UsuarioDTO usuario) {
        try {
            if (id <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido");
            }
            return usuarioService.updateUsuario(id, usuario);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar el usuario", e);
        }
    }

    @GetMapping("/{id}")
    public UsuarioDTO getUsuarioById(@PathVariable int id) {
        try {
            if (id <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido");
            }
            return usuarioService.getUsuarioById(id);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el usuario", e);
        }
    }
    
}
