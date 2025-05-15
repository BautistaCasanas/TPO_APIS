import React from 'react';
import { Link } from "react-router-dom"
import { Box, Container, Typography, IconButton } from "@mui/material"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import "./Footer.css"

const Footer = () => {
  return (
    <Box component="footer" className="footer-container">
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Contenedor principal de columnas con flexbox */}
        <Box className="footer-columns-container">
          {/* Primera columna - Nombre y descripción */}
          <Box className="footer-column">
            <Typography variant="h6" className="footer-title" gutterBottom>
              MYSTORE
            </Typography>
            <Typography className="footer-text">
              La mejor tienda el linea
            </Typography>
          </Box>

          {/* Segunda columna - Servicios */}
          <Box className="footer-column">
            <Typography variant="h6" className="footer-title" gutterBottom>
              TIENDA
            </Typography>
            <Box className="footer-links">
              <Link to="" className="footer-link">
                Ofertas
              </Link>
              <Link to="/productos" className="footer-link">
                Productos
              </Link>
            </Box>
          </Box>

          {/* Tercera columna - Nosotros */}
          <Box className="footer-column">
            <Typography variant="h6" className="footer-title" gutterBottom>
              NOSOTROS
            </Typography>
            <Box className="footer-links">
              <Link to="" className="footer-link">
                ¿Quienes Somos?
              </Link>
              <Link to="" className="footer-link">
                Trabaja con Nosotros
              </Link>
            </Box>
          </Box>

          {/* Cuarta columna - Contacto */}
          <Box className="footer-column">
            <Typography variant="h6" className="footer-title" gutterBottom>
              CONTACTO
            </Typography>
            <Box className="footer-links">
              <Typography className="footer-text">
                mystore@gmail.com
              </Typography>
              <Typography className="footer-text">
                0800 212-6464
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Línea inferior con copyright y redes sociales */}
        <Box className="footer-bottom">
          <Typography variant="body2" className="footer-copyright">
            Todos los derechos reservados por ©MYSTORE 2025
          </Typography>

          <Box className="social-icons">
            <IconButton className="social-icon">
              <InstagramIcon />
            </IconButton>
            <IconButton className="social-icon">
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
