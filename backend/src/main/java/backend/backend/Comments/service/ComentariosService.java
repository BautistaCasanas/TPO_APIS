package backend.backend.Comments.service;

import backend.backend.Comments.model.Comentarios;
import backend.backend.Comments.repository.ComentariosRepository;
import backend.backend.exceptions.BadRequestException;
import backend.backend.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    // }    // Guardar (crear o actualizar) un comentario
    public Comentarios guardarComentario(Comentarios comentario) {
        if (comentario.getUser() == null || comentario.getUser().isEmpty() ||
            comentario.getProductId() == null || comentario.getUserId() == null) {
            throw new BadRequestException("Datos obligatorios faltantes: user, productId y userId son requeridos");
        }
        
        try {
            return comentariosRepository.save(comentario);
        } catch (Exception e) {
            throw new RuntimeException("Error interno al guardar el comentario", e);
        }
    }    // Obtener comentarios por ID de producto
    public List<Comentarios> obtenerPorProducto(Long productId) {
        if (productId == null || productId <= 0) {
            throw new BadRequestException("ID de producto inválido");
        }
        
        try {
            return comentariosRepository.findByProductId(productId);
        } catch (Exception e) {
            throw new RuntimeException("Error interno al obtener comentarios por producto", e);
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
    // }    // Obtener comentario por ID (opcional)
    public Optional<Comentarios> obtenerPorId(Long id) {
        if (id == null || id <= 0) {
            throw new BadRequestException("ID inválido");
        }
        
        try {
            return comentariosRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error interno al obtener el comentario", e);
        }
    }    // Obtener comentario por ID (requerido - lanza excepción si no existe)
    public Comentarios obtenerComentarioRequerido(Long id) {
        if (id == null || id <= 0) {
            throw new BadRequestException("ID inválido");
        }
        
        return comentariosRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comentario", "id", id));
    }    // Eliminar un comentario por ID
    public void eliminarComentario(Long id) {
        if (id == null || id <= 0) {
            throw new BadRequestException("ID inválido");
        }
        
        // Verificamos que el comentario existe antes de eliminarlo
        obtenerComentarioRequerido(id);
        
        try {
            comentariosRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error interno al eliminar el comentario", e);
        }
    }
}
