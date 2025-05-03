import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Productos from "./pages/Productos";
import Perfil from "./pages/Perfil";
import {CartProvider} from "./Context/CartContext";
import DetalleProducto from "./pages/DetalleProducto";
import Dashboard from "./pages/Dashboard";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import {  UserProvider } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Checkout from "./Components/Checkout/Checkout";

function App() { 
  return (
    <>  
      <UserProvider>
          <CartProvider>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/productos" element={<Productos/>} />
                <Route path="/carrito" element={<Cart/>} />
                <Route path="/product/:id" element={<DetalleProducto/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />


                <Route path="/perfil" element={<ProtectedRoute><Perfil/></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
                <Route path="/dashboard/products" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />

            </Routes>
          </CartProvider>
        </UserProvider>
    </>
  )
}

export default App;
