import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import {
    Container,
    Paper,
    Typography,
    Card,
    CardContent,
    IconButton,
    Box,
    Button,
    Divider,
    Grid,
    CardMedia
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
// import { redirect } from 'react-router-dom';

const Cart = () => {
    const { getCart, removeFromCart, updateQuantity } = useContext(CartContext);
    const cart = getCart(); //Trae el carrito del contexto

    const navigate = useNavigate();

    const handleQuantityChange = (item, delta) => {
        const newQuantity = (item.quantity || 1) + delta;
        if (newQuantity > 0) {
            updateQuantity(item.id, newQuantity);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                    Carrito de Compras
                </Typography>

                {cart.length === 0 ? (
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            No hay productos en el carrito
                        </Typography>
                    </Paper>
                ) : (
                    <Box>
                        {cart.map((item) => (
                            <Card key={item.id} sx={{ mb: 2, boxShadow: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} sm={3}>
                                            <CardMedia
                                                component="img"
                                                image={item.image}
                                                alt={item.title}
                                                sx={{ 
                                                    width: 100,
                                                    height: 100,
                                                    objectFit: 'contain',
                                                    margin: 'auto'
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="h6" component="div">
                                                {item.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Box display="flex" alignItems="center" justifyContent="center">
                                                <IconButton 
                                                    size="small"
                                                    onClick={() => handleQuantityChange(item, -1)}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography sx={{ mx: 2 }}>
                                                    {item.quantity || 1}
                                                </Typography>
                                                <IconButton 
                                                    size="small"
                                                    onClick={() => handleQuantityChange(item, 1)}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                                <Typography variant="h6" color="primary">
                                                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                                                </Typography>
                                                <IconButton 
                                                    color="error"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, alignItems: 'center' }}>
                            <Typography variant="h5">
                                Total: ${calculateTotal().toFixed(2)}
                            </Typography>
                            <Button 
                                variant="contained" 
                                size="large" 
                                startIcon={<ShoppingCartCheckoutIcon />}
                                onClick={() => navigate('/checkout')}
                                sx={{ 
                                    backgroundColor: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    }
                                }}
                            >
                                Proceder al pago
                            </Button>
                        </Box>
                    </Box>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default Cart;
