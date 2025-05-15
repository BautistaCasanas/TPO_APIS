import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import ProductsList from "../Components/Products/ProductsList/ProductsList";
import ProductCarousel from '../Components/Carousel/ProductCarousel'; 
import Banner from "../Components/Carousel/Banner";
import AboutSection from "../Components/AboutUs/AboutSection"
function Home() { 

  return (
    <>
      <Navbar/>
      <Banner/>
      <ProductCarousel/>
      <AboutSection/>
      <Footer/>
    </>
  )
}

export default Home;
