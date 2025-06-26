package backend.backend.Products.controller;
import backend.backend.dto.ProductoDTO;
import backend.backend.exception.IdException;
import backend.backend.exception.NombreNuloException;
import backend.backend.exception.PrecioNegativoException;
import backend.backend.exception.ProductoNuloException;
import backend.backend.Products.model.Producto;
import backend.backend.Products.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
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
        try {
            return productoService.getAllProductos();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los productos", e);
        }
    }

    // GET BY ID: http://localhost:8081/api/products/1
    @GetMapping("/{id}")
    public Producto getProductoById(@PathVariable Long id) {
        try {
            if (id == null || id <= 0) {
                throw new IdException();
            }

            Producto producto = productoService.getProductoById(id);
            if (producto == null) {
                throw new ProductoNuloException();
            }

            return producto;

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al buscar el producto", e);
        }
    }

    // POST: http://localhost:8081/api/products
    @PostMapping
    public Producto createProducto(@RequestBody Producto producto) {
            if (producto.getPrice() <= 0) {
                throw new PrecioNegativoException();
            }
            if (producto.getName() == null) {
                throw new NombreNuloException();
            }
            return productoService.createProducto(producto);
    }

    // PUT: http://localhost:8081/api/products/{id}
    @PutMapping("/{id}")
    public Producto updateProducto(@PathVariable Long id, @RequestBody ProductoDTO producto) {
        try {
            if (id == null || id <= 0) {
                throw new IdException();
            }
            if (producto == null) {
                throw new ProductoNuloException();
            }
            if (producto.getPrice() <= 0) {
                throw new PrecioNegativoException();
            }
            return productoService.updateProducto(id, producto);

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar el producto", e);
        }
    }

    @PatchMapping("/{id}/stock")
    public Producto updateStock(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        try {
            Integer newStock = body.get("stock");

            if (newStock == null || newStock < 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stock inválido");
            }

            return productoService.updateStock(id, newStock);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar el stock", e);
        }
    }


    // DELETE: http://localhost:8081/api/products/{id}
    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable Long id) {
        if (id == null || id <= 0) {
            throw new IdException();
        }

        productoService.deleteProducto(id);

    }

    // GET por id de usuario: http://localhost:8081/api/products/user/{userId}
    @GetMapping("/user/{userId}")
    public List<Producto> getProductosByUserId(@PathVariable int userId) {
        if (userId <= 0) {
            throw new IdException();
        }

        List<Producto> productos = productoService.getProductosByUserId(userId);

        return productos;
    }
}
