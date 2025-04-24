import { useParams } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from '../../../Context/CartContext';
import { useFetch } from "../../../hooks/UseFetch.js";
import { Typography, Card, CardContent, CardMedia, Grid, Box, Paper, Button } from "@mui/material";
import Comentarios from "./Comentarios.jsx";


const ProductDetail = () => {
    const { id } = useParams();
    const { data: product, loading, error } = useFetch(`http://localhost:3000/products/${id}`);
    const { addToCart } = useContext(CartContext)

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p>Error al cargar el producto</p>;


    const addProduct = () => {
        let item = {
            id: product.id,
            name: product.name,  
            description: product.description,
            price: product.price,
            image: product.image
        };
        addToCart(item);
    }


    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
            <Paper elevation={3} sx={{ mb: 4 }}>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid>
                        <CardMedia
                            component="img"
                            alt={product.name}
                            height="250"
                            image={product.image}
                        />
                    </Grid>
                    <Grid>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {product.name}
                            </Typography>
                            <Typography variant="h5" color="primary" gutterBottom>
                                ${product.price}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {product.description}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Categoría: {product.category}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Stock disponible: {product.stock} unidades
                            </Typography>
                            <Button onClick={addProduct} variant="contained" >Agregar</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <Comentarios productId={id}/>
        </Box>
    );
};

export default ProductDetail;