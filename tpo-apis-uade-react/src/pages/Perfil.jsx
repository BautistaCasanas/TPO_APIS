import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { 
    Container, 
    Paper, 
    Typography, 
    Grid, 
    Avatar, 
    Box,
    CircularProgress,
    Alert,
    TextField,
    Button,
} from '@mui/material';

function Perfil() {
    const { auth } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!auth?.id) return;
            
            try {
                const response = await fetch(`http://localhost:3000/users/${auth.id}`);
                if (!response.ok) throw new Error('Error al cargar los datos del usuario');
                
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [auth?.id]);
    
    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
        </Box>
    );
    
    if (error) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Alert severity="error">Error al cargar la información del usuario</Alert>
        </Box>
    );

    return (
        <>
            <Navbar/>
            <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Perfil
                </Typography>
                
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Información de Usuario
                    </Typography>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                            <Avatar
                                src={userData.image}
                                alt={userData.name}
                                sx={{ width: 150, height: 150, margin: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Nombre:</strong> {userData.name}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Email:</strong> {userData.email}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Teléfono:</strong> {userData.phone}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Editar Información
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="name"
                            value={userData.name}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={userData.email}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Teléfono"
                            name="phone"
                            value={userData.phone}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ mt: 3 }}
                            type="submit"
                        >
                            Guardar Perfil
                        </Button>
                    </Box>
                </Paper>
            </Container>
            <Footer/>
        </>
    );
}

export default Perfil;
