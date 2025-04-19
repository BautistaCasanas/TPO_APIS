import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Cart from "./pages/Cart";
import {CartProvider} from "./Context/CartContext";

function App() { 


  return (
    <>
        <CartProvider>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/productos" element={<Productos/>} />
              <Route path="/carrito" element={<Cart/>} />
              <Route path="/perfil" element={<Home/>} />
          </Routes>
        </CartProvider>
    </>
  )
}

export default App;
