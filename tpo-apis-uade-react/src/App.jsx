import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Productos from "./pages/Productos";
import Perfil from "./pages/Perfil";
import {CartProvider} from "./Context/CartContext";
import DetalleProducto from "./pages/DetalleProducto";

import Dashboard from "./pages/Dashboard";

function App() { 


  return (
    <>
        <CartProvider>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/productos" element={<Productos/>} />
              {/* //Todo: Crear ruta protegida para el pago de carrito  y crear el componente de la autenticacion y crear el componente checkout.
              <Route path="/checkout" element={<protectedRoute><Cart/>}</protectedRoute> /> 
              // */}
              <Route path="/carrito" element={<Cart/>} />
              <Route path="/perfil" element={<Perfil/>} />
              <Route path="/product/:id" element={<DetalleProducto/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/dashboard/products" element={<Dashboard/>} />
          </Routes>
        </CartProvider>
    </>
  )
}

export default App;
