package backend.backend.Comments.controller;

import backend.backend.Comments.model.Comentarios;
import backend.backend.Comments.service.ComentariosService;
import backend.backend.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class ComentariosController {

    @Autowired
    private ComentariosService comentariosService;
    // GET BY PRODUCT ID: http://localhost:8081/api/comments/product/{productId}
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Comentarios>> comentariosPorProducto(@PathVariable Long productId) {
        if (productId == null || productId <= 0) {
            throw new BadRequestException("ID de producto inválido");
        }
        
        List<Comentarios> comentarios = comentariosService.obtenerPorProducto(productId);
        return ResponseEntity.ok(comentarios);
    }    
    
    // POST: http://localhost:8081/api/comments
    @PostMapping
    public ResponseEntity<Comentarios> crearComentario(@RequestBody Comentarios comentario) {
        if (comentario.getUser() == null || comentario.getUser().isEmpty() ||
            comentario.getProductId() == null || comentario.getUserId() == null) {
            throw new BadRequestException("Faltan datos obligatorios del comentario");
        }

        Comentarios nuevoComentario = comentariosService.guardarComentario(comentario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoComentario);
    }    
    
    // GET BY ID: http://localhost:8081/api/comments/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Comentarios> obtenerComentarioPorId(@PathVariable Long id) {
        Comentarios comentario = comentariosService.obtenerComentarioRequerido(id);
        return ResponseEntity.ok(comentario);
    }

    // DELETE: http://localhost:8081/api/comments/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarComentario(@PathVariable Long id) {
        comentariosService.eliminarComentario(id);
        return ResponseEntity.noContent().build();
    }

}
