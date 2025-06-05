package backend.backend.Products.service;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import backend.backend.Products.repository.ProductoRepository; // Importa el repositorio de productos
import org.springframework.beans.factory.annotation.Autowired; // Importa la anotación para inyección de dependencias
import org.springframework.http.HttpStatus;

import backend.backend.Products.model.Producto; // Importa la clase Producto
import java.util.*; // Importa la clase List para manejar listas

@Service // Indica que esta clase es un servicio de Spring, lo que permite la inyección de dependencias
@Transactional // Indica que los métodos de este servicio deben ser transaccionales
public class ProductoService {
    // Aquí se pueden agregar métodos para manejar la lógica de negocio relacionada con los productos
    // Por ejemplo, crear, actualizar o eliminar productos
    // También se pueden agregar métodos para manejar la lógica de negocio relacionada con los productos
    // Por ejemplo, calcular descuentos, aplicar promociones, etc.
    private final ProductoRepository productoRepository; // Repositorio de productos para acceder a la base de datos

    @Autowired // Inyecta el repositorio de productos para que se pueda usar en el servicio
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository; // Inicializa el repositorio de productos
    }

    // CRUD = Create, Read, Update, Delete
    // Aquí se pueden agregar métodos para manejar otras operaciones CRUD
    // Por ejemplo, crear, actualizar o eliminar productos
    public List<Producto> getAllProductos() {
        return this.productoRepository.findAll(); // Devuelve la lista de todos los productos
    }

    public Producto getProductoById(Long id) {
        try {
            if (id == null || id <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido");
            }
    
            return productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    
        } catch (ResponseStatusException e) {
            // Re-lanza errores controlados con su estado original
            throw e;
        } catch (Exception e) {
            // Otros errores no esperados: log y respuesta 500
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor", e);
        }
    }

    public Producto createProducto(Producto producto) {
        if(producto.getName() == null || producto.getPrice() <= 0) { // Verifica si el producto tiene un nombre, una descripción y un precio válido
            return null; // Devuelve null si el producto no tiene un nombre, una descripción o un precio válido
        }
        return this.productoRepository.save(producto); // Guarda un nuevo producto en la base de datos
    }

    public void deleteProducto(Long id) {
        this.productoRepository.deleteById(id); // Elimina el producto con el ID especificado
    }

    public Producto updateProducto(Long id, Producto producto) {
        if (this.productoRepository.existsById(id)) { // Verifica si el producto existe
            producto.setId(id); // Establece el ID del producto a actualizar
            return this.productoRepository.save(producto); // Guarda el producto actualizado en la base de datos
        }
        return null; // Devuelve null si el producto no existe
    }

}
