import React, { useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { useFetch } from '../hooks/UseFetch.js';
import Footer from '../Components/Footer/Footer.jsx';
import { 
    Container, 
    Paper, 
    Typography, 
    Grid, 
    Avatar, 
    TextField, 
    Button, 
    Box,
    CircularProgress,
    Alert
} from '@mui/material';

function Perfil() {
    const { data: userInfo, error, loading } = useFetch("http://localhost:3000/profile");
    
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
                                src={userInfo.image}
                                alt={userInfo.name}
                                sx={{ width: 150, height: 150, margin: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Nombre:</strong> {userInfo.name}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Email:</strong> {userInfo.email}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Teléfono:</strong> {userInfo.phone}
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
                            value={userInfo.name}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={userInfo.email}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Teléfono"
                            name="phone"
                            value={userInfo.phone}
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
