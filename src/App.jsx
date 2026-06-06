import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Banners from "./components/Banners";
import Categories from './components/Categories';
import Products from './components/Products';

const App = () => {
  return (
    <div>
      <Navbar />
      <Banners />
      <Categories />
      <Products />
      <Footer />
    </div>
  )
}
export default App