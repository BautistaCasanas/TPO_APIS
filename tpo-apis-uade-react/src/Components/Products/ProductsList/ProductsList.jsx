import { useState, useEffect } from "react";
import Card from "../../Cards/Card.jsx";
import { useFetch } from "../../../Hooks/UseFetch.js";
import { Grid, Container, Box, CircularProgress, Alert } from "@mui/material";

const ProductsList = ({ busqueda, filtro }) => {
  const { data: products, error, loading } = useFetch("http://localhost:8081/api/products");

  if (error) return <Alert severity="error">Error al cargar los productos</Alert>;
  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
      <CircularProgress />
    </Box>
  );

  const productosFiltrados = products.filter(product =>
    product.name.toLowerCase().includes(busqueda.toLowerCase()) &&
    (filtro ? product.category === filtro : true)
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={2}>
        {productosFiltrados.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Box sx={{
              height: '100%',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.2s ease-in-out',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }
            }}>
              <Card
                id={product.id}
                title={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsList;