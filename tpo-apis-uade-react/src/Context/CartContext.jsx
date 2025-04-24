import { createContext, useState } from 'react';
import { getLocalStorage, saveLocalStorage } from '../Hooks/LocalStorage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    // Función para agregar un item al carrito
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                // Si el item ya existe, incrementar la cantidad
                const updatedCart = prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                        : cartItem
                );
                saveLocalStorage('cart', updatedCart);
                return updatedCart;
            } else {
                // Si es un nuevo item, agregarlo con cantidad 1
                const updatedCart = [...prevCart, { ...item, quantity: 1 }];
                saveLocalStorage('cart', updatedCart);
                return updatedCart;
            }
        });
    };

    // Función para eliminar un item del carrito
    const removeFromCart = (id) => {
        const updatedCart = cart.filter((cartItem) => cartItem.id !== id);
        setCart(updatedCart);
        saveLocalStorage('cart', updatedCart);
    };

    // Función para actualizar la cantidad de un item
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity > 0) {
            setCart((prevCart) => {
                const updatedCart = prevCart.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                );
                saveLocalStorage('cart', updatedCart);
                return updatedCart;
            });
        }
    };

    // Función para obtener el carrito del localStorage
    const getCart = () => {
        return getLocalStorage('cart') || [];
    }

    // Función para obtener el número total de items en el carrito
    const getCartCount = () => {
        return getCart().reduce((acc, item) => acc + (item.quantity || 1), 0);
    }
    
    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            getCart, 
            getCartCount 
        }}>
            {children}
        </CartContext.Provider>
    );
}