import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/UseFetch.js";
import { Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";

const ProductDetail = () => {
    const { id } = useParams();
    const { data: product, loading, error } = useFetch(`http://localhost:3000/products/${id}`);

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p>Error al cargar el producto</p>;

    return (
        <Card>
            <Grid container spacing={2}>
                <Grid  xs={12} sm={6}>
                    <CardMedia
                        component="img"
                        alt={product.name}
                        height="300"
                        image={product.image}
                        title={product.name}
                    />
                </Grid>
                <Grid  xs={12} sm={6}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {product.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Precio: ${product.price}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Descripción: {product.description}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Categoría: {product.category}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Stock: {product.stock}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ProductDetail;
