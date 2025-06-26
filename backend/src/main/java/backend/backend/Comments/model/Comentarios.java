package backend.backend.Comments.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import backend.backend.Products.model.Producto;
import backend.backend.Users.model.Usuario;
import jakarta.persistence.*;
import lombok.Data;


@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity(name = "comments")
public class Comentarios {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;

    @Column(length = 50)
    private String rating; 

    @Column(length = 500)
    private String text;

    // Relación con Usuario
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)  // FK a usuarios.id
    private Usuario usuario;

    // Relación con Producto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)  // FK a productos.id
    private Producto producto;


}
