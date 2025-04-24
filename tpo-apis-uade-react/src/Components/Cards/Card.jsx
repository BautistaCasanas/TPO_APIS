import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import { Card as MUICard, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Card = ({ id, title, description, price, image }) => {
    const { addToCart } = useContext(CartContext);

    const addProduct = () => {
        let item = { id, title, description, price, image };
        addToCart(item);
    }

    return (
        <MUICard sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#ffffff',
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            '&:hover': {
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }
        }}>
            <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                    sx={{
                        height: 200,
                        objectFit: 'contain',
                        p: 2,
                        bgcolor: '#ffffff'
                    }}
                />
            </Link>
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="h6" component="div" sx={{ 
                    fontSize: '1.1rem',
                    mb: 1,
                    color: '#333333'
                }}>
                    ${price.toLocaleString('es-AR')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    mb: 1,
                    height: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                }}>
                    {title}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={addProduct}
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                            bgcolor: '#3483fa',
                            '&:hover': {
                                bgcolor: '#2968c8'
                            }
                        }}
                    >
                        Agregar
                    </Button>
                </Box>
            </CardContent>
        </MUICard>
    );
}

export default Card;
