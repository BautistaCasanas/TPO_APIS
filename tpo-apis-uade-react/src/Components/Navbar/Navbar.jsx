import React, { useState, useContext } from 'react';
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
import { useNavigate } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
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


    return (
        <AppBar position="static" sx={{height: 70, justifyContent: 'center'}}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: "space-between"}}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/home"
                        className="navbar-logo"
                    >
                        MyStore
                    </Typography>

                    <Box className="right-elements">
                        <Button color="inherit" component={Link} to="/home" className="nav-link">
                            Inicio
                        </Button>
                        <Button color="inherit" component={Link} to="/productos" className="nav-link">
                            Productos
                        </Button>

                        {auth?.token && auth?.usuario.role === 'ADMIN' && (
                            <Button 
                                color="inherit"
                                onClick={() => navigate('/publicar')}
                                className="nav-link"
                            >
                                Publicar
                            </Button>
                        )}

                        <IconButton 
                            color="inherit" 
                            component={Link} 
                            to="/carrito"
                            className="nav-icon"
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
                            className="nav-icon"
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
                                        <Typography variant="subtitle1">{auth?.usuario.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Rol: {auth?.usuario.role}
                                        </Typography>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem component={Link} to="/perfil" onClick={handleClose}>
                                        Mi perfil
                                    </MenuItem>

                                    {auth?.token && auth?.usuario.role === 'ADMIN' && (
                                    <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
                                        Gestión de Productos
                                    </MenuItem>
                                    )}
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
        </AppBar>
    );
};

export default Navbar;