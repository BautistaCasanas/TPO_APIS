package backend.backend.Products.model;
// import java.util.ArrayList;
// import java.util.List;
import jakarta.persistence.*;
import lombok.Data;
//Esto simboliza una tabla en la base de datos
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
    @Column(nullable = false) // Indica que este campo no puede ser nulo
    private int userId;
    @Column(length = 50) // Longitud máxima de la categoría
    private String category;

//     @ManyToMany(fetch = FetchType.LAZY)
//     @JoinTable(
//         name = "productos_categorias",
//         joinColumns = @JoinColumn(name = "producto_id"),
//         inverseJoinColumns = @JoinColumn(name = "categoria_id")
//     )
//     private List<Categoria> categorias = new ArrayList<>();
}
