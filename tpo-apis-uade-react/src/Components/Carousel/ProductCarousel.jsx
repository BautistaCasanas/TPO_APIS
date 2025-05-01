import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Box, Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/UseFetch';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductCarousel = () => {
  const { data: products, error, loading } = useFetch("http://localhost:3000/products");

  if (error) return <Alert severity="error">Error al cargar los productos</Alert>;
  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
      <CircularProgress />
    </Box>
  );

  // Agrupar productos de 3 en 3
  const groupedProducts = [];
  for (let i = 0; i < products.length; i += 3) {
    groupedProducts.push(products.slice(i, i + 3));
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Carousel slide interval={3000} variant='dark' indicators={false}>
        {groupedProducts.map((group, index) => (
          <Carousel.Item key={index}>
            <Grid container spacing={3} justifyContent={"center"} mb={1}>
              {group.map((product) => (
                <Grid key={product.id}>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <Card sx={{boxShadow: 3 , '&:hover': {transform: 'translateY(-3px)', transition: 'transform 0.3s ease-in-out'}}}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt={product.name}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {product.description}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          ${product.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Carousel.Item>
        ))}
      </Carousel>
    </Box>
  );
};

export default ProductCarousel;