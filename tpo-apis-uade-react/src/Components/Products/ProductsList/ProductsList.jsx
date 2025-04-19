import { useState, useEffect } from "react";
import Card from "../../Cards/Card.jsx";
import { useFetch } from "../../../hooks/UseFetch.js";

const ProductsList = ({ busqueda, filtro }) => {
  const { data: products, error, loading } = useFetch("http://localhost:3000/products");

  if (error) return <div>Error al cargar los productos</div>;
  if (loading) return <div>Cargando...</div>;

  // const categorias = [...new Set(products.map(p => p.category))]; 

  const productosFiltrados = products.filter(product =>
    product.name.toLowerCase().includes(busqueda.toLowerCase()) &&
    (filtro ? product.category === filtro : true)
  );

  return (
    <div className="container">
      <div className="row">
        {productosFiltrados.map((product) => (
          <div className="col-md-4" key={product.id}>
            <Card
              id={product.id}
              title={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductsList;