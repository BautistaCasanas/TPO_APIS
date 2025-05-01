import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Box,CircularProgress } from '@mui/material';
import { useFetch } from '../../hooks/UseFetch';
import 'bootstrap/dist/css/bootstrap.min.css';

const Banner = () => {
  const { data: banners, loading, error } = useFetch('http://localhost:3000/banners');

  if (error) return <Alert severity="error">Error al cargar el banner</Alert>;
  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ width: '100%', marginBottom: 4 }}>
      <Carousel slide>
        {banners.map((banner) => (
          <Carousel.Item key={banner.id}>
            <img
              className="d-block w-100"
              src={banner.image}
              alt={banner.title}
              style={{ 
                height: '400px',
                objectFit: 'cover'
              }}
            />
            <Carousel.Caption>
              <h1>{banner.title}</h1>
              <p>{banner.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Box>
  );
};

export default Banner;