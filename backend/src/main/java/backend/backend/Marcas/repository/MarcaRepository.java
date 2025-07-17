package backend.backend.Marcas.repository;

import backend.backend.Marcas.model.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
    Optional<Marca> findByNombre(String nombre);
    boolean existsByNombre(String nombre);

    // Ignorar mayusculas
    Optional<Marca> findByNombreIgnoreCase(String nombre);
}
