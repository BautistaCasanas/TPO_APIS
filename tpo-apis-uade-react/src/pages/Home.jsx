import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import ProductsList from "../Components/Products/ProductsList/ProductsList";
import ProductCarousel from '../Components/Carousel/ProductCarousel'; 

function Home() { 

  return (
    <>
      <Navbar/>
      <h1>Home</h1>
      <ProductCarousel/>
      <Footer/>
    </>
  )
}

export default Home;
