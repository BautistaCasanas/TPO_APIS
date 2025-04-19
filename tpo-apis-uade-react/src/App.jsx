import {Routes, Route} from "react-router-dom";
import Home from "./Views/Home";
import Productos from "./Views/Productos";
import {CartContext} from "./Context/UseContext";

function App() { 


  return (
    <>
        <CartContext>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/productos" element={<Productos/>} />
              <Route path="/carrito" element={<Home/>} />
              <Route path="/perfil" element={<Home/>} />
          </Routes>
        </CartContext>
    </>
  )
}

export default App;
