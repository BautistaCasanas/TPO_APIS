import { useState } from 'react'


const Card = ({ id, title, description, price, image }) => {

    const [prendido, setPrendido] = useState(false);

    const handleClick = () => {
        setPrendido(!prendido);
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
                <button onClick={handleClick} className="btn btn-primary">Agregar</button>
            </div>
        </div>  
       </>
    )
}

export default Card;
