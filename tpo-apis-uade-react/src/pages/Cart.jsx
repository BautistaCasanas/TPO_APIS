import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const Cart = () => {
    const { getCart, removeFromCart, updateQuantity } = useContext(CartContext);
    const cart = getCart();

    const handleQuantityChange = (item, delta) => {
        const newQuantity = (item.quantity || 1) + delta;
        if (newQuantity > 0) {
            updateQuantity(item.id, newQuantity);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    return (
        <>
            <Navbar />

            <div className="container my-4">
                <h1 className="h3 fw-bold mb-4">Carrito de Compras</h1>
                {cart.length === 0 ? (
                    <p>No hay productos en el carrito.</p>
                ) : (
                    <>
                        {cart.map((item) => (
                            <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom py-3">
                                <div className="d-flex align-items-center">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="me-3" 
                                        style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                                    />
                                    <div>
                                        <h5 className="mb-1">{item.title}</h5>
                                        <div className="text-primary small">
                                            <button onClick={() => removeFromCart(item.id)} className="btn btn-link btn-sm p-0 me-3">
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <button 
                                        className="btn btn-outline-secondary btn-sm me-2" 
                                        onClick={() => handleQuantityChange(item, -1)}
                                    >−</button>
                                    <span className="mx-2">{item.quantity || 1}</span>
                                    <button 
                                        className="btn btn-outline-secondary btn-sm ms-2" 
                                        onClick={() => handleQuantityChange(item, 1)}
                                    >+</button>
                                    <div className="ms-4 fw-semibold">
                                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="d-flex justify-content-end mt-4">
                            <div className="text-end">
                                <h4>Total: ${calculateTotal().toFixed(2)}</h4>
                                <button className="btn btn-primary mt-2">
                                    Proceder al pago
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Footer/>
        </>
    );
};

export default Cart;
