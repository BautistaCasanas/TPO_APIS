import { createContext,useState } from 'react';
import { getLocalStorage, saveLocalStorage } from '../Hooks/LocalStorage';


export const CartContext = createContext();


export const CartProvider = ({ children }) => {


    const [cart, setCart] = useState([]);
    
    // Función para agregar un item al carrito
    const addToCart = (item) => { 
        console.log("agregando al carrito", item); // Muestra en consola el item que se va a agregar
        setCart((prevCart) => [...prevCart, item]); // Actualiza el estado del carrito agregando el nuevo item
        saveLocalStorage('cart', [...cart, item]); // Guarda el carrito en el localStorage
    };

    // Función para eliminar un item del carrito
    const removeFromCart = (id) => {
        console.log("eliminando del carrito id:", id);
        const updatedCart = cart.filter((cartItem) => cartItem.id !== id);
        setCart(updatedCart); // Actualiza el estado del carrito eliminando el item
        saveLocalStorage('cart', updatedCart); // Guarda el carrito actualizado en el localStorage
    };
    

    // Función para obtener el carrito del localStorage
    const getCart = () => {
        
        return getLocalStorage('cart') || [];
    }

    const getCartCount = () => {
        return getCart().reduce((acc, item) => acc + 1, 0); // Devuelve la cantidad total de items en el carrito
    }
    
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart,getCart,getCartCount }}> {/* Le paso lo que quiero compartir */}
        {children} {/* Componentes que estand entro del contexto */}
        </CartContext.Provider>
    );
}