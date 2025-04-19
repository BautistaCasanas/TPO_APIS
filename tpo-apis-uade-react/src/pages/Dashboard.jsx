import { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import ProductManagement from "../Components/ProductsManagment/ProductsManagment";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";


function Dashboard() {
  const [activeSection, setActiveSection] = useState("products")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Función para cambiar entre secciones
  const navigateTo = (section) => {
    setActiveSection(section)
  }

  // Función para alternar la visibilidad de la barra lateral en móviles
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Renderizar el contenido según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case "products":
        return <ProductManagement />
      case "users":
        return <UserManagement />
      default:
        return <ProductManagement />
    }
  }

  return (

    <>

    <Navbar/>

    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div
          className={`col-md-3 col-lg-2 d-md-block bg-light sidebar collapse ${sidebarOpen ? "show" : ""}`}
          style={{ maxWidth: "250px" }}
        >
          <Sidebar activeSection={activeSection} onNavigate={navigateTo} />
        </div>

        {/* Main content */}
        <div className="col-md-9 col-lg-10 ms-sm-auto px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">{activeSection === "products" ? "Gestión de Productos" : "Gestión de Usuarios"}</h1>
            <button className="btn btn-sm btn-outline-secondary d-md-none" onClick={toggleSidebar}>
              {sidebarOpen ? "Cerrar menú" : "Abrir menú"}
            </button>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Dashboard
