package backend.backend.Categories.model;

import java.util.ArrayList;
import java.util.List;

import backend.backend.Products.model.Producto;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "categorias") // Nombre de la tabla en la base de datos
public class Categoria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String nombre;
    @Column(length = 255) 
    private String descripcion;

    @ManyToMany(mappedBy = "categorias")
    private List<Producto> productos = new ArrayList<>();
    

}
