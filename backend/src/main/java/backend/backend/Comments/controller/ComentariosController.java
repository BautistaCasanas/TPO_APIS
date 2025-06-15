package backend.backend.Comments.controller;

import backend.backend.Comments.model.Comentarios;
import backend.backend.Comments.service.ComentariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class ComentariosController {

    @Autowired
    private ComentariosService comentariosService;


    // GET BY PRODUCT ID: http://localhost:8081/api/comentarios/producto/{productId}
    @GetMapping("/product/{productId}")
    public List<Comentarios> comentariosPorProducto(@PathVariable Long productId) {
        try {
            if (productId == null || productId <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID de producto inválido");
            }
            return comentariosService.obtenerPorProducto(productId);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener comentarios del producto", e);
        }
    }

    // POST: http://localhost:8081/api/comentarios
    @PostMapping
    public Comentarios crearComentario(@RequestBody Comentarios comentario) {
        try {
            if (comentario.getUser() == null || comentario.getUser().isEmpty() ||
                comentario.getProductId() == null || comentario.getUserId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Faltan datos obligatorios del comentario");
            }

            return comentariosService.guardarComentario(comentario);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al crear el comentario", e);
        }
    }

}
