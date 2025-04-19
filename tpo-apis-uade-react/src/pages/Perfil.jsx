import React, { useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { useFetch } from '../hooks/UseFetch.js';

    function Perfil() {
        

        const { data: userInfo, error, loading } = useFetch("http://localhost:3000/profile");
        if (error) return <div>Error al cargar la información del usuario</div>;
        if (loading) return <div>Cargando...</div>;

        return (
            <>
            <Navbar/>


            <div className="container mt-5">
                <h1 className="mb-4">Perfil</h1>
                <div className="card mb-4">
                    <div className="card-body">
                        <h2 className="card-title">Información de Usuario</h2>
                        <div className="row align-items-center">
                            <div className="col-md-4 text-center">
                                <img
                                    src={userInfo.image}
                                    alt="User"
                                    className="img-fluid rounded-circle mb-3"
                                    style={{ width: '150px', height: '150px' }}
                                />
                            </div>
                            <div className="col-md-8">
                                <p><strong>Nombre:</strong> {userInfo.name}</p>
                                <p><strong>Email:</strong> {userInfo.email}</p>
                                <p><strong>Teléfono:</strong> {userInfo.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Editar Información</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nombre:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    // onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    // onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Teléfono:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    // onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div> */}
            </div>
            </>
        );
};
export default Perfil;
