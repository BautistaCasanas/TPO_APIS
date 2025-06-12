import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import {
    Card as MUICard,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Card = ({ id, title, description, price, image }) => {
    const { addToCart } = useContext(CartContext);
    const [stock, setStock] = useState(null);
    
    useEffect(() => {
        const fetchStock = async () => {
            try {
                const res = await fetch(`http://localhost:8081/api/products/${id}`);
                const data = await res.json();
                setStock(data.stock);
            } catch (error) {
                console.error("Error al obtener el stock:", error);
            }
        };
        fetchStock();
    }, [id]);

    const addProduct = () => {
        const item = { id, title, description, price, image };
        addToCart(item);
        setStock(prev => prev - 1);
    };

    return (
        <MUICard>
            <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                    height="200"
                />
            </Link>
            <CardContent>
                <Typography variant="subtitle1" component="h2" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    ${price.toLocaleString('es-AR')}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Stock disponible: {stock !== null ? stock : '...'}
                </Typography>
                <Box mt={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={addProduct}
                        startIcon={<ShoppingCartIcon />}
                        disabled={stock <= 0}
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
                        {stock <= 0 ? 'Sin stock' : 'Agregar'}
                        
                    </Button>
                </Box>
            </CardContent>
        </MUICard>
    );
};

export default Card;
