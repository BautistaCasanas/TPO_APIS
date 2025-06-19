package backend.backend.Users.controller;

import backend.backend.Users.model.Usuario;
import backend.backend.Users.service.UserService;
import backend.backend.dto.UsuarioDTO;
import backend.backend.exceptions.BadRequestException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService usuarioService;

    // PUT: http://localhost:8081/api/users/{id}
    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable int id, @RequestBody UsuarioDTO usuario) {
        if (id <= 0) {
            throw new BadRequestException("ID inválido");
        }
        return usuarioService.updateUsuario(id, usuario);
    }

    @GetMapping("/{id}")
    public UsuarioDTO getUsuarioById(@PathVariable int id) {
        if (id <= 0) {
            throw new BadRequestException("ID inválido");
        }
        return usuarioService.getUsuarioById(id);
    }
}
