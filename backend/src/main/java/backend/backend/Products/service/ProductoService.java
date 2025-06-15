package backend.backend.Products.service;
import backend.backend.dto.ProductoDTO;
import backend.backend.Products.model.Producto;
import backend.backend.Products.repository.ProductoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class ProductoService {

    private final ProductoRepository productoRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<Producto> getAllProductos() {
        try {
            return productoRepository.findAll();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener productos", e);
        }
    }

    public Producto getProductoById(Long id) {
        try {
            if (id == null || id <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido");
            }

            return productoRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el producto", e);
        }
    }

    public Producto createProducto(Producto producto) {
        try {
            if (producto.getName() == null || producto.getPrice() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nombre o precio inválido");
            }
            return productoRepository.save(producto);

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al crear el producto", e);
        }
    }

    public void deleteProducto(Long id) {
        try {
            if (id == null || id <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido");
            }
            if (!productoRepository.existsById(id)) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
            }

            productoRepository.deleteById(id);

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar el producto", e);
        }
    }

    public Producto updateProducto(Long id, ProductoDTO producto) {
        try {
            if (id == null || id <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido");
            }
            if (!productoRepository.existsById(id)) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
            }

            Producto existingProducto = productoRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

            existingProducto.setName(producto.getName());
            existingProducto.setDescription(producto.getDescription());
            existingProducto.setPrice(producto.getPrice());
            existingProducto.setImage(producto.getImageUrl());
            existingProducto.setCategory(producto.getCategory());
            existingProducto.setStock(producto.getStock());



            return productoRepository.save(existingProducto);

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar el producto", e);
        }
    }

    public Producto updateStock(Long id, Integer newStock) {
        try {
            if (id == null || id <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido");
            }
    
            Producto producto = productoRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    
            producto.setStock(newStock);
    
            return productoRepository.save(producto);
    
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar el stock", e);
        }
    }

    
    public List<Producto> getProductosByUserId(int userId) {
        try {

            if (userId <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID de usuario inválido");
            }

            return productoRepository.findByUserId(userId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener productos por usuario", e);
        }
    }
    
}
