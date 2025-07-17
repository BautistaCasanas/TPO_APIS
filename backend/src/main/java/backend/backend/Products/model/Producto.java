package backend.backend.Products.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import backend.backend.Marcas.model.Marca;
import backend.backend.Users.model.Usuario;
// import java.util.ArrayList;
// import java.util.List;
import jakarta.persistence.*;
import lombok.Data;
//Esto simboliza una tabla en la base de datos
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity(name = "productos") // Nombre de la tabla en la base de datos
public class Producto {
    
    @Id // Indica que este campo es la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Si se quiere autogenerar el ID

    private Long id;
    @Column(nullable = false, length = 100) // Indica que este campo no puede ser nulo
    private String name;
    @Column(length = 255) // Longitud máxima de la descripción
    private String description;
    @Column(nullable = false) // Indica que este campo no puede ser nulo
    private int stock;
    @Column(nullable = false) // Indica que este campo no puede ser nulo
    private double price;
    @Column(length = 255) // Longitud máxima de la imagen
    private String image;
    @Column(nullable = false)
    private Long userId;
    @Column(length = 50) // Longitud máxima de la categoría
    private String category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false, insertable = false, updatable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "marca_id", nullable = false)
    private Marca marca;
}
