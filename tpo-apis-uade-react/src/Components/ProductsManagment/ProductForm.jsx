import React, { useState, useEffect, useContext } from 'react';
import { 
    Container,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Box,
    Paper,
    Divider,
    Grid,
    IconButton
} from '@mui/material';
import { PhotoCamera, ArrowBack, Save } from '@mui/icons-material';
import { categories } from './categories';
import { UserContext } from '../../Context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useContext(UserContext);
    const initialData = location.state?.initialData || null;

    const [form, setForm] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        images: []
    });

    const [errors, setErrors] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: ''
    });

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    const validateField = (name, value, allValues = form) => {
    switch (name) {
        case 'name':
            if (!value) return 'El nombre es requerido';
            return '';
        case 'category':
            if (!value) return 'La categoría es requerida';
            return '';
        case 'description':
            if (!value) return 'La descripción es requerida';
            return '';
        case 'price':
            if (!value) return 'El precio es requerido';
            if (isNaN(value)) return 'El precio debe ser un número válido';
            return '';
        case 'stock':
            if (!value) return 'El stock es requerido';
            if (Number(value) < 0) return 'El stock no puede ser negativo';
            if (isNaN(value)) return 'El stock debe ser un número válido';
            return '';
        default:
            return '';
        }
    };

    const isFormValid = () => {
        const requiredFields = ['name', 'category', 'description', 'price', 'stock'];
        const validations = requiredFields.map(field => validateField(field, form[field], form));
        return validations.every(validation => validation === '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSaveProduct = async (productData) => {
        const url = initialData
        ? `http://localhost:3000/products/${initialData.id}`
        : "http://localhost:3000/products";

    const method = initialData ? "PUT" : "POST";

    try {
        await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...productData,
                userId: auth.id,
                id: initialData?.id 
            })
        });
        navigate(-1);
    } catch (error) {
        console.error('Error al guardar el producto:', error);
    }
};

    const handleSubmit = () => {
        const newErrors = {};
        Object.keys(form).forEach(key => {
            if (key !== 'images') {
                newErrors[key] = validateField(key, form[key]);
            }
        });

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error !== '')) return;

        handleSaveProduct(form);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => navigate(-1)} sx={{ p: 1 }}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h4" component="h1">
                        {initialData ? 'Editar Producto' : 'Nuevo Producto'}
                    </Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Grid container spacing={3}>
                    {/* Información básica */}
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                            Información básica
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <TextField
                                label="Nombre del producto"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                required
                                fullWidth
                                variant="outlined"
                            />

                            <FormControl fullWidth error={!!errors.category} required>
                                <InputLabel id="category-label">Categoría</InputLabel>
                                <Select
                                    labelId="category-label"
                                    name="category"
                                    value={form.category}
                                    label="Categoría"
                                    onChange={handleChange}
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat.id} value={cat.id}>
                                            {cat.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                            </FormControl>

                            <TextField
                                label="Descripción"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                error={!!errors.description}
                                helperText={errors.description}
                                required
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                            />
                        </Box>
                    </Grid>

                    {/* Precio y Stock */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                            Precio y disponibilidad
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <TextField
                                label="Precio"
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={handleChange}
                                error={!!errors.price}
                                helperText={errors.price}
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                                }}
                                variant="outlined"
                            />

                            <TextField
                                label="Stock"
                                name="stock"
                                type="number"
                                value={form.stock}
                                onChange={handleChange}
                                error={!!errors.stock}
                                helperText={errors.stock}
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </Box>
                    </Grid>

                    {/* Imágenes */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                            Imágenes del producto
                        </Typography>
                        <Box 
                            sx={{ 
                                border: '2px dashed #ccc',
                                borderRadius: 2,
                                p: 3,
                                textAlign: 'center'
                            }}
                        >
                            <input
                                accept="image/*"
                                type="file"
                                multiple
                                style={{ display: 'none' }}
                                id="image-upload"
                            />
                            <label htmlFor="image-upload">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<PhotoCamera />}
                                >
                                    Subir imágenes
                                </Button>
                            </label>
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                Formatos aceptados: JPG, PNG, GIF
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    gap: 2 
                }}>
                    <Button 
                        variant="outlined" 
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowBack />}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                        startIcon={<Save />}
                    >
                        Guardar producto
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProductForm;
