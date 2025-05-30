package backend.backend.Products.controller;
import backend.backend.Products.model.Producto; // Importa la clase Producto
import java.util.List; // Importa la clase List para manejar listas

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*; // Importa todas las anotaciones de Spring para crear un controlador REST
import backend.backend.Products.service.ProductoService; // Importa el servicio de productos

@RestController // Indica que esta clase es un controlador REST
@RequestMapping("/api/productos") // Define la ruta base para las peticiones a este controlador
public class ProductoController {

    @Autowired // Inyecta el servicio de productos para que se pueda usar en el controlador
    private ProductoService productoService; // Inyección de dependencias del servicio de productos

    //localhost:8080/api/productos
    @GetMapping // Define un endpoint para obtener todos los productos
    public List<Producto> getAllProductos() {
        return productoService.getAllProductos(); // Devuelve la lista de todos los productos
    }

    //localhost:8080/api/productos/1
    @GetMapping("/{id}") // Define un endpoint para obtener un producto por su ID
    public Producto getProductoById(@PathVariable Long id) { 
        return productoService.getProductoById(id); // Devuelve el producto con el ID especificado
    }

    //localhost:8080/api/productos
    @PostMapping // Define un endpoint para crear un nuevo producto
    public Producto createProducto(@RequestBody Producto producto) { // Recibe el producto en el cuerpo de la petición
        try {
            if (producto.getName() == null || producto.getPrice() <= 0) { // Verifica si el producto tiene un nombre y un precio válido
                return null; // Devuelve null si el producto no tiene un nombre o un precio válido
            }

             return productoService.createProducto(producto); // Crea un nuevo producto y lo devuelve

        } catch (Exception e) {
            return null; // Devuelve null si ocurre una excepción
        }
    }

    @PutMapping("/{id}") // Define un endpoint para actualizar un producto por su ID
    public Producto updateProducto(@PathVariable Long id, @RequestBody Producto producto) { // Recibe el producto en el cuerpo de la petición
        return productoService.updateProducto(id, producto); // Actualiza el producto y lo devuelve
    }

    @DeleteMapping("/{id}") // Define un endpoint para eliminar un producto por su ID
    public void deleteProducto(@PathVariable Long id) { // Recibe el ID del producto a eliminar
        productoService.deleteProducto(id); // Elimina el producto con el ID especificado
    }

}
