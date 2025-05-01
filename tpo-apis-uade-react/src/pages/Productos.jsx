import React, { useState } from 'react';
import ProductsList from '../Components/Products/ProductsList/ProductsList';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { 
    Container, 
    Paper, 
    TextField, 
    FormControl, 
    Select, 
    MenuItem, 
    InputLabel,
    Box,
    Button,
    IconButton,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

const Productos = () => {
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('');

    const limpiarFiltros = () => {
        setBusqueda('');
        setFiltro('');
    };

    return (
        <>
            <Navbar/>
            <Container maxWidth="lg">
                <Paper elevation={1} sx={{ 
                    p: 2, 
                    my: 3,
                    backgroundColor: '#fff',
                    borderRadius: 2
                }}>
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 2,
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}>
                        <TextField
                            variant="outlined"
                            placeholder="Buscar productos..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            sx={{ flexGrow: 1 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: busqueda && (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setBusqueda('')} size="small">
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                                label="Categoría"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FilterListIcon color="action" />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value="">Todas las categorías</MenuItem>
                                <MenuItem value="clothing">Ropa</MenuItem>
                                <MenuItem value="electronics">Tecnología</MenuItem>
                            </Select>
                        </FormControl>
                        {(busqueda || filtro) && (
                            <Button 
                                variant="outlined" 
                                onClick={limpiarFiltros}
                                startIcon={<ClearIcon />}
                            >
                                Limpiar filtros
                            </Button>
                        )}
                    </Box>
                </Paper>

                <ProductsList busqueda={busqueda} filtro={filtro} />
            </Container>
            <Footer/>
        </>
    );
};

export default Productos;