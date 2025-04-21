
import React, { useState, useRef, useEffect,useContext } from 'react';

import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';


const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();

    const { getCartCount } = useContext(CartContext);
    const cartCount = getCartCount();

    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/home">
                    MyStore
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos">Productos</Link>
                        </li>
                    </ul>

                    
                    <div className="d-flex align-items-center gap-3 position-relative">
                        <Link className="text-white text-decoration-none" to="/carrito">
                            <FaShoppingCart size={18} />
                        </Link>

                        {cartCount > 0 && (
                                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                                    {cartCount}
                                </span>
                            )}

                        <div ref={dropdownRef}>
                            <span
                                role="button"
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="text-white"
                            >
                                <FaUser size={18} />
                            </span>
                            {/* TODO: Implementar logica en un futuro para el admin, si es admin no se muestra configuracion */}
                            {showDropdown && (
                                <div className="dropdown-menu dropdown-menu-end show position-absolute" style={{ right: 0, top: '100%' }}>
                                    <div className="px-3 py-2">
                                        <strong>Juan Pérez</strong>
                                        <div className="text-muted small">juan@example.com</div>
                                    </div>
                                    <hr className="my-1" />
                                    <Link to="/perfil" className="dropdown-item">Mi perfil</Link>
                                    <Link to="/dashboard" className="dropdown-item">Configuración</Link>
                                    <button className="dropdown-item text-danger" onClick={() => console.log('Cerrar sesión')}>
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
