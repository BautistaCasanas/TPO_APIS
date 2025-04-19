
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';


const Card = ({ id, title, description, price, image }) => {

    const { addToCart } = useContext(CartContext) // Importa la función addToCart del contexto

    const addProduct = () => {
        let item = { id, title, description, price, image };
        addToCart(item);
    }

        
    return (
        <>
        {/*Quiero una card con estilos Con estilos lo quiero con boostrap*/}

        <div className="card" key={id}>
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">{price}</p>
                <button onClick={addProduct} className="btn btn-primary">Agregar</button>
            </div>
        </div>  
       </>
    )
}

export default Card;
