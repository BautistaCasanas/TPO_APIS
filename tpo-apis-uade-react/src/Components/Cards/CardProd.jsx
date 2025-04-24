import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

const CardProd = ({ id, title, description, price, image }) => {

    const { addToCart } = useContext(CartContext) // Importa la función addToCart del contexto

    const addProduct = () => {
        let item = { id, title, description, price, image };
        addToCart(item);
    }
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ boxShadow: 3, '&:hover': { transform: 'translateY(-3px)', transition: 'transform 0.3s ease-in-out' } }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={image}
                        alt={title}
                    />
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {description}
                        </Typography>
                        <Typography variant="h6" color="primary">
                            ${price}
                        </Typography>
                        <Button onClick={addProduct} variant="contained" color="primary" sx={{ mt: 2 }}>
                            Agregar al carrito
                        </Button>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
        );
    };
    export default CardProd;