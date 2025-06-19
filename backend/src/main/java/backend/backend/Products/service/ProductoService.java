package backend.backend.Products.service;
import backend.backend.dto.ProductoDTO;
import backend.backend.Products.model.Producto;
import backend.backend.Products.repository.ProductoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.backend.exceptions.BadRequestException;
import backend.backend.exceptions.ResourceNotFoundException;

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
            throw new RuntimeException("Error al obtener productos", e);
        }
    }

    public Producto getProductoById(Long id) {
        if (id == null || id <= 0) {
            throw new BadRequestException("ID inválido");
        }
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", id));
    }

    public Producto createProducto(Producto producto) {
        if (producto.getName() == null || producto.getPrice() <= 0) {
            throw new BadRequestException("Nombre o precio inválido");
        }
        try {
            return productoRepository.save(producto);
        } catch (Exception e) {
            throw new RuntimeException("Error al crear el producto", e);
        }
    }

    public void deleteProducto(Long id) {
        if (id == null || id <= 0) {
            throw new BadRequestException("ID inválido");
        }
        if (!productoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Producto", "id", id);
        }
        try {
            productoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar el producto", e);
        }
    }

    public Producto updateProducto(Long id, ProductoDTO producto) {
        if (id == null || id <= 0) {
            throw new BadRequestException("ID inválido");
        }
        if (!productoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Producto", "id", id);
        }
        try {
            Producto existingProducto = productoRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", id));
            existingProducto.setName(producto.getName());
            existingProducto.setDescription(producto.getDescription());
            existingProducto.setPrice(producto.getPrice());
            existingProducto.setImage(producto.getImageUrl());
            existingProducto.setCategory(producto.getCategory());
            existingProducto.setStock(producto.getStock());
            return productoRepository.save(existingProducto);
        } catch (Exception e) {
            throw new RuntimeException("Error al actualizar el producto", e);
        }
    }

    public Producto updateStock(Long id, Integer newStock) {
        if (id == null || id <= 0) {
            throw new BadRequestException("ID inválido");
        }
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", id));
        producto.setStock(newStock);
        try {
            return productoRepository.save(producto);
        } catch (Exception e) {
            throw new RuntimeException("Error al actualizar el stock", e);
        }
    }

    public List<Producto> getProductosByUserId(int userId) {
        if (userId <= 0) {
            throw new BadRequestException("ID de usuario inválido");
        }
        try {
            return productoRepository.findByUserId(userId);
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener productos por usuario", e);
        }
    }
}
