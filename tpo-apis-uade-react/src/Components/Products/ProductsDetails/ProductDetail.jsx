import { useParams } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from '../../../Context/CartContext';
import { useFetch } from "../../../hooks/UseFetch.js";
import { Typography, Card, CardContent, CardMedia, Grid , Button} from "@mui/material";


const ProductDetail = () => {
    const { id } = useParams();
    const { data: product, loading, error } = useFetch(`http://localhost:3000/products/${id}`);
    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p>Error al cargar el producto</p>;

    //TODO: Modificar card para poder pasar el estilo de la card por props
    const { addToCart } = useContext(CartContext) // Importa la función addToCart del contexto
    const addProduct = () => {
        let item = { id: product.id, name: product.name, description: product.description, price: product.price, image: product.image };
        addToCart(item);
    }

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
                        <Button variant="contained" color="primary" className="mt-1" onClick={addProduct}>
                            Agregar
                        </Button>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ProductDetail;
