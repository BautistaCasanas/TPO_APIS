import { createContext, useState, useEffect } from 'react';
import { getLocalStorage, saveLocalStorage } from '../Hooks/LocalStorage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = getLocalStorage('user');
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);
    
    const login = (userData) => {
        setUser(userData);
        saveLocalStorage('user', userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Eliminar completamente del localStorage
    };
    
    const isLogged = () => {
        return user !== null;
    };

    const updateUser = (newUserData) => {
        setUser(newUserData);
        saveLocalStorage('user', newUserData);
    };

    return (
        <UserContext.Provider value={{ 
            user,
            login,
            logout,
            isLogged,
            updateUser
        }}>
            {children}
        </UserContext.Provider>
    );
}