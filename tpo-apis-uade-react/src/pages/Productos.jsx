
import React, { useState } from 'react';
import ProductsList from '../Components/Products/ProductsList/ProductsList';
import Navbar from '../Components/Navbar/Navbar';

const Productos = () => {
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('');

    return (
        <>
        <Navbar/>

        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Productos</h1>
            <div className='flex items-center mb-4'>
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    className='border-2 border-gray-300 rounded p-2'
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <select
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className='border-2 border-gray-300 rounded p-2 ml-2'
                >
                    <option value="">Todas las categorías</option>
                    <option value="clothing">Ropa</option>
                    <option value="electronics">Tecnología</option>
                </select>
                <button onClick={() => {setFiltro('');setBusqueda('')}} className='btn btn-primary'>Limpiar Filtro</button>
            </div>

            <ProductsList busqueda={busqueda} filtro={filtro} />
        </div>
        </>
    );
};

export default Productos;