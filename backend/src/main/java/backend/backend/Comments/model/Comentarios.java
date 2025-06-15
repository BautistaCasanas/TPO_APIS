package backend.backend.Comments.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @Column(nullable = false, length = 100) 
    private String user;
    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    private Long productId; 

    @Column(length = 50)
    private String rating; 

    @Column(length = 500)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false, insertable = false, updatable = false)
    private Usuario usuario;


}
