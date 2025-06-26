package backend.backend.Products.controller;

import backend.backend.dto.ProductoDTO;
import backend.backend.exception.IdException;
import backend.backend.exception.NombreNuloException;
import backend.backend.exception.PrecioNegativoException;
import backend.backend.exception.ProductoNuloException;
import backend.backend.Products.model.Producto;
import backend.backend.Products.service.ProductoService;
import backend.backend.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductoController {
    @Autowired
    private ProductoService productoService;

    // GET ALL: http://localhost:8081/api/products
    @GetMapping
    public List<Producto> getAllProductos() {
        return productoService.getAllProductos();
    }

    // GET BY ID: http://localhost:8081/api/products/1
    @GetMapping("/{id}")
    public Producto getProductoById(@PathVariable Long id) {
        return productoService.getProductoById(id);
    }

    // POST: http://localhost:8081/api/products
    @PostMapping
    public Producto createProducto(@RequestBody Producto producto) {
        return productoService.createProducto(producto);
    }

    // PUT: http://localhost:8081/api/products/{id}
    @PutMapping("/{id}")
    public Producto updateProducto(@PathVariable Long id, @RequestBody ProductoDTO producto) {
        return productoService.updateProducto(id, producto);
    }

    @PatchMapping("/{id}/stock")
    public Producto updateStock(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        Integer newStock = body.get("stock");
        if (newStock == null || newStock < 0) {
            throw new BadRequestException("Stock inválido");
        }
        return productoService.updateStock(id, newStock);
    }


    // DELETE: http://localhost:8081/api/products/{id}
    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
    }

    // GET por id de usuario: http://localhost:8081/api/products/user/{userId}
    @GetMapping("/user/{userId}")
    public List<Producto> getProductosByUserId(@PathVariable int userId) {
        return productoService.getProductosByUserId(userId);
    }
}
