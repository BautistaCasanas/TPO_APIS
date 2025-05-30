package backend.backend.Users.model;
import backend.backend.Orders.model.Pedido;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity(name = "usuarios")
public class Usuario {

    @Id // Indica que este campo es la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Si se quiere autogenerar el ID

    private Long id;
    private String name;
    private String email;
    private String password;
    private String role;
    private String address;
    private String phone;
    private String image;
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    List<Pedido> pedidos;
}
