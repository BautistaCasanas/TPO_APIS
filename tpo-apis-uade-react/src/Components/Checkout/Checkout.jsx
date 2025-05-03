import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout Data:', formData);
    // Aquí puedes enviar los datos al backend
  };

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 700, mx: 'auto', my: 5, px: 2 }}>
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600 }}>
            Confirmar Pedido
          </Typography>

          <Divider sx={{ my: 3 }} />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre completo"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Código Postal"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="País"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate('/carrito')}
                  sx={{ px: 3 }}
                >
                  Volver al Carrito
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ px: 3 }}
                >
                  Realizar Pedido
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default Checkout;
