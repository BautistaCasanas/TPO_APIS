package backend.backend.Categories.service;

import backend.backend.Categories.model.Categories;
import backend.backend.Categories.repository.CategoriesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class CategoriesService {

    private final CategoriesRepository categoriesRepository;

    @Autowired
    public CategoriesService(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    public List<Categories> getAllCategorias() {
        try {
            return categoriesRepository.findAll();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener las categorías", e);
        }
    }

    public Categories createCategoria(Categories categoria) {
        try {
            if (categoria.getName() == null || categoria.getName().trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nombre de la categoría inválido");
            }

            return categoriesRepository.save(categoria);

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al crear la categoría", e);
        }
    }
}
