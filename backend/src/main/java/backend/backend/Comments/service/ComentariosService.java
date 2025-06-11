package backend.backend.Comments.service;

import backend.backend.Comments.model.Comentarios;
import backend.backend.Comments.repository.ComentariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ComentariosService {

    private final ComentariosRepository comentariosRepository;

    @Autowired
    public ComentariosService(ComentariosRepository comentariosRepository) {
        this.comentariosRepository = comentariosRepository;
    }

    // Obtener todos los comentarios
    // public List<Comentarios> obtenerTodos() {
    //     try {
    //         return comentariosRepository.findAll();
    //     } catch (Exception e) {
    //         throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los comentarios", e);
    //     }
    // }

    // Guardar (crear o actualizar) un comentario
    public Comentarios guardarComentario(Comentarios comentario) {
        try {
            if (comentario.getUser() == null || comentario.getUser().isEmpty() ||
                comentario.getProductId() == null || comentario.getUserId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Datos obligatorios faltantes");
            }
            return comentariosRepository.save(comentario);
        } catch (ResponseStatusException e) {
            throw e; // re-lanzar errores controlados
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al guardar el comentario", e);
        }
    }

    // Obtener comentarios por ID de producto
    public List<Comentarios> obtenerPorProducto(Long productId) {
        try {
            if (productId == null || productId <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID de producto inválido");
            }
            return comentariosRepository.findByProductId(productId);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener comentarios por producto", e);
        }
    }

    // Eliminar un comentario por ID
    // public void eliminarComentario(Long id) {
    //     try {
    //         if (id == null || id <= 0) {
    //             throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido");
    //         }
    //         if (!comentariosRepository.existsById(id)) {
    //             throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Comentario no encontrado");
    //         }
    //         comentariosRepository.deleteById(id);
    //     } catch (ResponseStatusException e) {
    //         throw e;
    //     } catch (Exception e) {
    //         throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar el comentario", e);
    //     }
    // }

    // Obtener comentario por ID (opcional)
    public Optional<Comentarios> obtenerPorId(Long id) {
        try {
            if (id == null || id <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido");
            }
            return comentariosRepository.findById(id);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el comentario", e);
        }
    }
}
