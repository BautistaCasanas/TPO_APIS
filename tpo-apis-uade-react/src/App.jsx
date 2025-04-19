import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Productos from "./pages/Productos";
import Perfil from "./pages/Perfil";
import {CartProvider} from "./Context/CartContext";
import DetalleProducto from "./pages/DetalleProducto";


function App() { 


  return (
    <>
        <CartProvider>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/productos" element={<Productos/>} />
              <Route path="/carrito" element={<Cart/>} />
              <Route path="/perfil" element={<Perfil/>} />
              <Route path="/product/:id" element={<DetalleProducto/>} />
          </Routes>
        </CartProvider>
    </>
  )
}

export default App;
