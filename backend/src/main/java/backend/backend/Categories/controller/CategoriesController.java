package backend.backend.Categories.controller;

import backend.backend.Categories.model.Categories;
import backend.backend.Categories.service.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoriesController {

    @Autowired
    private CategoriesService categoriaService;

    // GET ALL: http://localhost:8081/api/categories
    @GetMapping
    public List<Categories> getAllCategorias() {
        try {
            return categoriaService.getAllCategorias();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener las categorías", e);
        }
    }

    // POST: http://localhost:8081/api/categories
    @PostMapping
    public Categories createCategoria(@RequestBody Categories categoria) {
        try {
            if (categoria.getName() == null || categoria.getName().trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre de la categoría es obligatorio");
            }

            return categoriaService.createCategoria(categoria);

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al crear la categoría", e);
        }
    }
}
