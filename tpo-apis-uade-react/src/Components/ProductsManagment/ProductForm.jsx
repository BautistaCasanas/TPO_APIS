import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel   } from '@mui/material';
import { categories } from './categories';

const ProductForm = ({ open, onClose, onSave, initialData }) => {


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

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return !value ? 'El nombre es requerido' : '';
            case 'category':
                return !value ? 'La categoría es requerida' : '';
            case 'description':
                return !value ? 'La descripción es requerida' : '';
            case 'price':
                if (!value) return 'El precio es requerido';
                if (Number(value) < 0) return 'El precio no puede ser negativo';
                return '';
            case 'stock':
                if (!value) return 'El stock es requerido';
                if (Number(value) < 0) return 'El stock no puede ser negativo';
                return '';
            default:
                return '';
        }
    };

    const isFormValid = () => {
        return (
            form.name.trim() !== '' &&
            form.category !== '' &&
            form.description.trim() !== '' &&
            form.price !== '' &&
            Number(form.price) >= 0 &&
            form.stock !== '' &&
            Number(form.stock) >= 0 &&
            Object.values(errors).every(error => error === '')
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = () => {
        // Validar todos los campos
        const newErrors = {};
        Object.keys(form).forEach(key => {
            if (key !== 'images') {
                newErrors[key] = validateField(key, form[key]);
            }
        });

        setErrors(newErrors);

        // Verificar si hay errores
        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        onSave(form);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField 
                    label="Nombre" 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
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
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.category && (
                        <FormHelperText>{errors.category}</FormHelperText>
                    )}
                </FormControl>
                <TextField 
                    label="Descripción" 
                    name="description" 
                    value={form.description} 
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                    required
                />
                <TextField 
                    label="Precio" 
                    name="price" 
                    type="number" 
                    value={form.price} 
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={errors.price}
                    required
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
                />
                <input type="file" multiple />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button 
                onClick={handleSubmit} 
                variant="contained"
                disabled={!isFormValid()}
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductForm;
