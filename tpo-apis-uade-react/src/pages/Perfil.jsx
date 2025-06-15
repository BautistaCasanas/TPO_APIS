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
    const [editData, setEditData] = useState({ name: '', email: '', phone: '' });
    const [editLoading, setEditLoading] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!auth?.usuario.id) return;

            try{
                const data = {
                    id: auth.usuario.id,
                    name: auth.usuario.name || '',
                    email: auth.usuario.email || '',
                    phone: auth.usuario.phone || '',
                    image: auth.usuario.image || 'https://via.placeholder.com/150'
                };
                setUserData(data);
                setEditData({ name: data.name, email: data.email, phone: data.phone });
            }catch(err) {
                setError('Error al cargar los datos del usuario');
            }finally {
                setLoading(false);
            }



            // try {
            //     const response = await fetch(`http://localhost:3000/users/${auth.id}`);
            //     if (!response.ok) throw new Error('Error al cargar los datos del usuario');
            //     const data = await response.json();
            //     setUserData(data);
            //     setEditData({ name: data.name || '', email: data.email || '', phone: data.phone || '' });
            // } catch (err) {
            //     setError(err.message);
            // } finally {
            //     setLoading(false);
            // }
        };
        fetchUserData();
    }, [auth?.usuario.id]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        setEditSuccess(false);
        setError(null);
        try {
            const response = await fetch(`http://localhost:3000/users/${auth.id}` , {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...userData, ...editData })
            });
            if (!response.ok) throw new Error('Error al actualizar el perfil');
            const updated = await response.json();
            setUserData(updated);
            setEditSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setEditLoading(false);
        }
    };

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
                    <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleEditSubmit}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="name"
                            value={editData.name}
                            margin="normal"
                            variant="outlined"
                            onChange={handleEditChange}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={editData.email}
                            margin="normal"
                            variant="outlined"
                            onChange={handleEditChange}
                        />
                        <TextField
                            fullWidth
                            label="Teléfono"
                            name="phone"
                            value={editData.phone}
                            margin="normal"
                            variant="outlined"
                            onChange={handleEditChange}
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ mt: 3 }}
                            type="submit"
                            disabled={editLoading}
                        >
                            {editLoading ? 'Guardando...' : 'Guardar Perfil'}
                        </Button>
                        {editSuccess && <Alert severity="success" sx={{ mt: 2 }}>Perfil actualizado correctamente</Alert>}
                    </Box>
                </Paper>
            </Container>
            <Footer/>
        </>
    );
}

export default Perfil;
