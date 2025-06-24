import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../../Context/CartContext';
import { useFetch } from "../../../Hooks/UseFetch.js";
import { Typography, CardMedia, Grid, Box, Paper, Button } from "@mui/material";
import Comentarios from "./Comentarios.jsx";

const ProductDetail = () => {
    const { id } = useParams();
    const { data: product, loading, error } = useFetch(`http://localhost:8081/api/products/${id}`);
    const { addToCart } = useContext(CartContext);
    const [currentStock, setCurrentStock] = useState(0);

    useEffect(() => {
        if (product) {
            setCurrentStock(product.stock);
        }
    }, [product]);

    const fetchCurrentStock = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/products/${id}`);
            const data = await response.json();
            setCurrentStock(data.stock);
        } catch (error) {
            console.error('Error fetching stock:', error);
        }
    };

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p>Error al cargar el producto</p>;

    const addProduct = async () => {
        let item = {
            id: product.id,
            name: product.name,  
            description: product.description,
            price: product.price,
            image: product.image,
            stock: currentStock
        };
        await addToCart(item);
        fetchCurrentStock(); // Actualizar el stock después de agregar al carrito
    }

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" sx={{ mt: 2, mb: 2, ml: 2, fontWeight: 'bold' }}>
                Información del Producto
            </Typography>
            <Paper elevation={0} sx={{ mb: 4 }}>
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
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
                                ${product.price}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {product.description}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Categoría: {product.category}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Stock disponible: {currentStock} unidades
                            </Typography>
                            <Button 
                                onClick={addProduct} 
                                variant="contained"
                                disabled={currentStock <= 0}
                                sx={{
                                    backgroundColor: '#fff',
                                    color: '#000', 
                                    '&:hover': {
                                        backgroundColor: '#999',
                                        color: '#fff', 
                                    },
                                    '&:disabled': {
                                        backgroundColor: '#999',
                                        color: '#fff',
                                }}}
                            >
                                {currentStock > 0 ? 'Agregar' : 'Sin stock'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <Comentarios productId={id}/>
        </Box>
    );
};

export default ProductDetail;