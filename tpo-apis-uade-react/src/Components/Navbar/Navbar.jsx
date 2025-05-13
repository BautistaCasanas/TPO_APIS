import React, { useState, useContext } from 'react';
import { useFetch } from '../../hooks/UseFetch';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { UserContext } from '../../Context/UserContext';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    IconButton, 
    Badge,
    Menu,
    MenuItem,
    Container,
    Divider,
    Box
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ProductForm from '../ProductsManagment/ProductForm';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openProductForm, setOpenProductForm] = useState(false);
    const { getCartCount } = useContext(CartContext);
    const { auth, logout } = useContext(UserContext);
    const cartCount = getCartCount();

    //console.log('auth', auth.name);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSaveProduct = async (productData) => {
        try {
            await fetch("http://localhost:3000/products", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    ...productData,
                    userId: auth.id
                })
            });
            setOpenProductForm(false);
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/home"
                        sx={{ 
                            flexGrow: 1, 
                            textDecoration: 'none', 
                            color: 'inherit',
                            fontWeight: 'bold' 
                        }}
                    >
                        MyStore
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button color="inherit" component={Link} to="/home">
                            Inicio
                        </Button>
                        <Button color="inherit" component={Link} to="/productos">
                            Productos
                        </Button>

                        {auth?.token && (
                            <Button 
                                color="inherit"
                                onClick={() => setOpenProductForm(true)}
                                sx={{ ml: 1 }}
                            >
                                Publicar
                            </Button>
                        )}

                        <IconButton 
                            color="inherit" 
                            component={Link} 
                            to="/carrito"
                            sx={{ ml: 2 }}
                        >
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                        <IconButton
                            size="large"
                            onClick={handleMenu}
                            color="inherit"
                            sx={{ ml: 1 }}
                        >
                            <AccountCircle />
                        </IconButton>
                        
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            {auth?.token ? (
                                <Box>
                                    <MenuItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <Typography variant="subtitle1">{auth.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Rol: {auth.role}
                                        </Typography>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem component={Link} to="/perfil" onClick={handleClose}>
                                        Mi perfil
                                    </MenuItem>
                                    <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
                                        Gestión de Productos
                                    </MenuItem>
                                    <MenuItem 
                                        onClick={() => {
                                            logout();
                                            handleClose();
                                        }} 
                                        sx={{ color: 'error.main' }}
                                    >
                                        Cerrar sesión
                                    </MenuItem>
                                </Box>
                            ) : (
                                <MenuItem component={Link} to="/login" onClick={handleClose}>
                                    Iniciar sesión
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <ProductForm 
                open={openProductForm}
                onClose={() => setOpenProductForm(false)}
                onSave={handleSaveProduct}
                initialData={null}
            />
        </AppBar>
    );
};

export default Navbar;