import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    
    const [auth, setAuth] = useState(() => {
        // Intentar recuperar los datos de autenticación del localStorage al iniciar
        const savedAuth = localStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : null;
    });

   
    // Actualizar localStorage cuando cambie auth
    useEffect(() => {
        if (auth) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            localStorage.removeItem('auth');
        }
    }, [auth]);

     const login = (tokenData) => {
        setAuth(tokenData);
    };

    const logout = () => {
        setAuth(null);
        navigate('/');
        
    };

    return (
        <UserContext.Provider value={{ 
            auth,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>
    );
}