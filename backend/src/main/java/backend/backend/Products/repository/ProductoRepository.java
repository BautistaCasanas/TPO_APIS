package backend.backend.Products.repository;
import backend.backend.Products.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// Aquí se define la interfaz del repositorio
// Se extiende de JpaRepository para obtener las funcionalidades CRUD

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Aquí se pueden agregar métodos personalizados si es necesario
    List<Producto> findByUserId(int userId);
}

