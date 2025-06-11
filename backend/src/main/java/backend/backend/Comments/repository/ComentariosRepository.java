package backend.backend.Comments.repository;

import backend.backend.Comments.model.Comentarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComentariosRepository extends JpaRepository<Comentarios, Long> {

    // Método para buscar comentarios por ID de producto
    List<Comentarios> findByProductId(Long productId);
}
