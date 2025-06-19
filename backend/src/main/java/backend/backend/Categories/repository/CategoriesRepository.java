package backend.backend.Categories.repository;

import backend.backend.Categories.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio que hereda las operaciones CRUD de JPA
public interface CategoriesRepository extends JpaRepository<Categories, Long> {
    
}
