import React, { useState, useEffect } from 'react';
import { Button, Grid, Box } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("La respuesta no es un array de productos");
        }
      })
      .catch((error) => console.error('Error al cargar los productos:', error));
  }, []);

  //  3 productos sig
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 < products.length ? prevIndex + 3 : 0
    );
  };

  // 3 productos prev
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 >= 0 ? prevIndex - 3 : Math.floor(products.length / 3) * 3
    );
  };

  if (products.length === 0) {
    return <p>Cargando productos...</p>;
  }

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <IconButton
            onClick={prevSlide}
            sx={{
            position: 'absolute',
            top: '50%',
            left: 50,
            transform: 'translateY(-50%)',
            }}
        >
    <ArrowBackIosIcon fontSize="small" />
  </IconButton>

      <Grid container spacing={2} justifyContent="center">
        {products
          .slice(currentIndex, currentIndex + 3) // Mostrar de a 3 productos
          .map((product) => (
            <Grid item xs={12} sm={4} key={product.id}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                sx={{
                  textAlign: 'center',
                  borderRadius: '8px',
                  boxShadow: 3,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: 'auto' }}
                />
                <Box sx={{ p: 2 }}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p><strong>${product.price}</strong></p>
                </Box>
              </Box>
              </Link>
            </Grid>
          ))}
      </Grid>

      <IconButton
    onClick={nextSlide}
    sx={{
      position: 'absolute',
      top: '50%',
      right: 50,
      transform: 'translateY(-50%)',
    }}
  >
    <ArrowForwardIosIcon fontSize="small" />
  </IconButton>
    </Box>
  );
};

export default ProductCarousel;
