import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container text-center">
        <p className="mb-0">© 2025 MyStore. Todos los derechos reservados.</p>
        <ul className="list-inline mt-2">
          <li className="list-inline-item">
            <Link to="/home" className="text-white text-decoration-none">Inicio</Link>
          </li>
          <li className="list-inline-item mx-2">|</li>
          <li className="list-inline-item">
            <Link to="/productos" className="text-white text-decoration-none">Productos</Link>
          </li>
          <li className="list-inline-item mx-2">|</li>
          <li className="list-inline-item">
            <Link to="/perfil" className="text-white text-decoration-none">Perfil</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
