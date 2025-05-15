import { useState } from 'react';
import { 
    Container, 
    Box, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    IconButton, 
    InputAdornment 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import usePost from '../../Hooks/UsePost';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();


    const validateField = (name, value, allValues = formData) => {
        switch (name) {
            case 'nombre':
                if (!value) return 'El nombre es requerido';
                if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres';
                return '';
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) return 'El email es requerido';
                if (!emailRegex.test(value)) return 'Email inválido';
                return '';
            case 'password':
                if (!value) return 'La contraseña es requerida';
                if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
                return '';
            case 'confirmPassword':
                if (!value) return 'Debe confirmar la contraseña';
                if (value !== allValues.password) return 'Las contraseñas no coinciden';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFormData = {
            ...formData,
            [name]: value
        };
        
        setFormData(newFormData);
        
        // Validar el campo actual
        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, value, newFormData),
            // Si estamos cambiando la contraseña, revalidar confirmPassword
            ...(name === 'password' && {
                confirmPassword: validateField('confirmPassword', newFormData.confirmPassword, newFormData)
            })
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('registra usuario');
        // // Validar todos los campos antes de enviar
        // const newErrors = {
        //     nombre: validateField('nombre', formData.nombre),
        //     email: validateField('email', formData.email),
        //     password: validateField('password', formData.password),
        //     confirmPassword: validateField('confirmPassword', formData.confirmPassword)
        // };
        
        // setErrors(newErrors);

        // // Si hay errores, no continuar con el envío
        // if (Object.values(newErrors).some(error => error !== '')) {
        //     return;
        // }

        // usePost("perfiles",newErrors);
        // try{
        // }catch(error){
        //     console.log(error);
        // }


    };

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: 8
                    }}
                >
                    <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                        <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                            Registro
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="nombre"
                                label="Nombre completo"
                                name="nombre"
                                autoComplete="name"
                                autoFocus
                                value={formData.nombre}
                                onChange={handleChange}
                                error={!!errors.nombre}
                                helperText={errors.nombre}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirmar Contraseña"
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrarse
                            </Button>
                            <Button
                                fullWidth
                                variant="text"
                                onClick={() => navigate('/login')}
                            >
                                ¿Ya tienes cuenta? Inicia sesión
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default Register;