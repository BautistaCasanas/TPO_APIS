package backend.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductoDTO {
    Long id;
    String name;
    String description;
    Double price;
    String imageUrl;
    String category;
    Integer stock;
}
