import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material"
import VerifiedIcon from "@mui/icons-material/Verified"
import SecurityIcon from "@mui/icons-material/Security"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import "./AboutSection.css"
import { Link } from "react-router-dom"

const AboutSection = () => {
    return (
        <Container maxWidth="lg" className="about-container">
        <Grid container spacing={4}>
            {/* Columna izquierda */}
            <Grid item xs={12} md={5}>
            <Box className="about-left-column">
                <Button variant="contained" className="about-button" disableElevation>
                Sobre nosotros
                </Button>

                <Typography variant="h4" className="about-title">
                ¿Qué es MyStore?
                </Typography>

                <Typography className="about-description">
                Es una tienda online que ofrece una amplia variedad de productos seleccionados con criterio y calidad, pensados para acompañarte en tu día a día. Trabajamos con marcas reconocidas y proveedores confiables para garantizarte siempre lo mejor.
                </Typography>
            </Box>
            </Grid>

            {/* Columna derecha */}
            <Grid item xs={12} md={7}>
            <Box className="cards-container">
                <Grid container spacing={3}>
                {/* Tarjeta 1 */}
                <Grid item xs={12} sm={6}>
                    <Paper className="info-card">
                    <Box className="icon-circle">
                        <VerifiedIcon />
                    </Box>
                    <Typography variant="h6" className="card-title">
                        Calidad
                    </Typography>
                    <Typography className="card-description">
                        Ofrecemos una amplia selección de productos cuidadosamente elegidos.
                    </Typography>
                    </Paper>
                </Grid>

                {/* Tarjeta 2 */}
                <Grid item xs={12} sm={6}>
                    <Paper className="info-card">
                    <Box className="icon-circle">
                        <SecurityIcon />
                    </Box>
                    <Typography variant="h6" className="card-title">
                        Fácil y segura
                    </Typography>
                    <Typography className="card-description">
                        Navegá, elegí y pagá con métodos de pago protegidos.
                    </Typography>
                    </Paper>
                </Grid>

                {/* Tarjeta 3 */}
                <Grid item xs={12} sm={6}>
                    <Paper className="info-card">
                    <Box className="icon-circle">
                        <SupportAgentIcon />
                    </Box>
                    <Typography variant="h6" className="card-title">
                        Atención personalizada
                    </Typography>
                    <Typography className="card-description">
                        Nuestro equipo de soporte responde rápido está para ayudarte
                    </Typography>
                    </Paper>
                </Grid>

                {/* Tarjeta 4 - Destacada */}
                <Grid item xs={12} sm={6}>
                    <Paper className="highlight-card">
                    <Typography variant="h2" className="highlight-number">
                        +500
                    </Typography>
                    <Typography className="highlight-text">Productos en nuestra plataforma</Typography>
                    <Link to="/productos" className="highlight-button">
                        Ver Productos
                    </Link>
                    </Paper>
                </Grid>
                </Grid>
            </Box>
            </Grid>
        </Grid>
        </Container>
    )
}

export default AboutSection