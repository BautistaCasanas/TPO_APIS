import { useState, useContext } from 'react';
import { 
    Container, 
    Box, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    IconButton, 
    InputAdornment,
    Alert,
    Snackbar
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) return 'El email es requerido';
                if (!emailRegex.test(value)) return 'Email inválido';
                return '';
            case 'password':
                if (!value) return 'La contraseña es requerida';
                if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newErrors = {
            email: validateField('email', formData.email),
            password: validateField('password', formData.password)
        };
    
        setErrors(newErrors);
    
        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8081/api/auth/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            // console.log('Response:', response);

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const userInfo = await response.json();
            // console.log('Token:', token);
            login(userInfo);
            navigate('/');

        } catch (error) {
            console.error('Error during login:', error);
            setShowError(true);
        }
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
                    }}
                >
                    <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                        <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                            Iniciar Sesión
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
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
                                autoComplete="current-password"
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Iniciar Sesión
                            </Button>
                            <Button
                                fullWidth
                                variant="text"
                                onClick={() => navigate('/register')}
                            >
                                ¿No tienes cuenta? Regístrate
                            </Button>
                        </Box>
                    </Paper>
                </Box>
                <Snackbar
                    open={showError}
                    autoHideDuration={6000}
                    onClose={() => setShowError(false)}
                >
                    <Alert 
                        onClose={() => setShowError(false)} 
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        Credenciales inválidas
                    </Alert>
                </Snackbar>
            </Container>
            <Footer />
        </>
    );
};

export default Login;