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
    Avatar,
    Divider,
    Box
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { getCartCount } = useContext(CartContext);
    const { isLogged, logout } = useContext(UserContext);
    const cartCount = getCartCount();
    const { data: userInfo, error, loading } = useFetch("http://localhost:3000/profile");
    
    const isUserLogged = isLogged();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                        <Button 
                            color="inherit" 
                            component={Link} 
                            to="/home"
                        >
                            Inicio
                        </Button>
                        <Button 
                            color="inherit" 
                            component={Link} 
                            to="/productos"
                        >
                            Productos
                        </Button>

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
                            {isUserLogged ? [
                                <MenuItem key="user-info" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography variant="subtitle1">{userInfo.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {userInfo.email}
                                    </Typography>
                                </MenuItem>,
                                <Divider key="divider" />,
                                <MenuItem key="profile" component={Link} to="/perfil" onClick={handleClose}>
                                    Mi perfil
                                </MenuItem>,
                                <MenuItem key="dashboard" component={Link} to="/dashboard" onClick={handleClose}>
                                    Configuración
                                </MenuItem>,
                                <MenuItem 
                                    key="logout"
                                    onClick={() => {
                                        logout();
                                        handleClose();
                                    }} 
                                    sx={{ color: 'error.main' }}
                                >
                                    Cerrar sesión
                                </MenuItem>
                            ] : (
                                <MenuItem component={Link} to="/login" onClick={handleClose}>
                                    Iniciar sesión
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
