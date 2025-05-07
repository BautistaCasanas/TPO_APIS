import { createContext, useState } from 'react';
import { getLocalStorage, saveLocalStorage } from '../Hooks/LocalStorage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    // Función para agregar un item al carrito
    const addToCart = async (item) => {
        const res = await fetch(`http://localhost:3000/products/${item.id}`);
        const product = await res.json();
    
        if (product.stock <= 0) {
            alert('Sin stock disponible');
            return;
        }
    
        await updateProductStock(item.id, product.stock - 1);
    
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            let updatedCart;
    
            if (existingItem) {
                updatedCart = prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedCart = [...prevCart, { ...item, quantity: 1 }];
            }
    
            saveLocalStorage('cart', updatedCart);
            return updatedCart;
        });
    };
    const updateProductStock = async (productId, newStock) => {
        await fetch(`http://localhost:3000/products/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ stock: newStock })
        });
    };

    // Función para eliminar un item del carrito
    const removeFromCart = async (id) => {
        const removedItem = cart.find((item) => item.id === id);
        if (removedItem) {
            const res = await fetch(`http://localhost:3000/products/${id}`);
            const product = await res.json();
    
            const newStock = product.stock + removedItem.quantity;
            await updateProductStock(id, newStock);
        }
    
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        saveLocalStorage('cart', updatedCart);
    };

    // Función para actualizar la cantidad de un item
    const updateQuantity = async (id, newQuantity) => {
        const existingItem = cart.find((item) => item.id === id);
        if (!existingItem) return;
    
        const difference = newQuantity - existingItem.quantity;
        const res = await fetch(`http://localhost:3000/products/${id}`);
        const product = await res.json();
    
        if (difference > 0 && product.stock < difference) {
            alert('No hay suficiente stock disponible');
            return;
        }
    
        await updateProductStock(id, product.stock - difference);
    
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
            saveLocalStorage('cart', updatedCart);
            return updatedCart;
        });
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