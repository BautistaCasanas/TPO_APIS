package backend.backend.Categories.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import backend.backend.Products.model.Producto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity(name = "categorias")
public class Categories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @ManyToMany(mappedBy = "categorias", fetch = FetchType.LAZY)
    private List<Producto> productos = new ArrayList<>();
}

