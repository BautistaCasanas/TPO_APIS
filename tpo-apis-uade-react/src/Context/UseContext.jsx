import React from 'react'; // Importa React



const cartContext = React.createContext(); // Crea el contexto para el carrito

export const CartContext = ({ children }) => {
    const [cart, setCart] = React.useState([]);
    
    // Función para agregar un item al carrito
    const addToCart = (item) => { 
        setCart((prevCart) => [...prevCart, item]); // Actualiza el estado del carrito agregando el nuevo item
    };

    // Función para eliminar un item del carrito
    const removeFromCart = (item) => {
        setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id)); // Filtra el carrito para eliminar el item especificado
    }
    
    return (
        <cartContext.Provider value={{ cart, addToCart, removeFromCart }}> {/* Le paso lo que quiero compartir */}
        {children} {/* Componentes que estand entro del contexto */}
        </cartContext.Provider>
    );
}