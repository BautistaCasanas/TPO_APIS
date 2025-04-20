import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
const DetalleProducto = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error("Error al obtener producto:", error));
  }, [id]);
  

  if (!product) return <p>Cargando producto...</p>;

  return (
    <>
    <Navbar />
    <div style={{ padding: '2rem' }}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: 300 }} />
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Categoría:</strong> {product.category}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
    </div>
    <Footer />
    </>
  );
};

export default DetalleProducto;
