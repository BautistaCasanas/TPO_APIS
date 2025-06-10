import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Box } from '@mui/material';
// import { useFetch } from '../../hooks/UseFetch';
import 'bootstrap/dist/css/bootstrap.min.css';

const Banner = () => {
  // const { data: banners, loading, error } = useFetch('http://localhost:8081/api/banners');

  const banners = [
    {
      "id": "1",
      "image": "https://images.unsplash.com/photo-1607082350899-7e105aa886ae",
      "title": "Ofertas Especiales",
      "description": "Hasta 50% de descuento"
    },
    {
      "id": "2",
      "image": "https://plus.unsplash.com/premium_photo-1725075088693-1c51b6084294?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "title": "Nueva Coleccion",
      "description": "Ultimas tendencias"
    },
    {
      "id": "3",
      "image": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
      "title": "Envio Gratis",
      "description": "En compras superiores a $100000"
    }
  ];

  // if (error) return <Alert severity="error">Error al cargar el banner</Alert>;
  // if (loading) return (
  //   <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
  //     <CircularProgress />
  //   </Box>
  // );

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
                height: '91vh',
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