import React, { useState } from 'react'
// import './Home.css'
import Navbar from '../../components/navbar/Navbar'
import Caurosel from '../../components/caurosel/Caurosel'
import Products from '../../components/products/Products'
import Footer from '../../components/footer/Footer'
import Advantages from '../../components/Advantages/Advantages'
import ProductsCaurosel from '../../components/productsCaurosel/ProductsCaurosel'

const Home = () => {
    return (
        <div className="light-theme home-container">
            <Navbar />
            <Caurosel />
            <ProductsCaurosel />
            <Products />
            <Advantages />
            <Footer />
        </div>
    )
}

export default Home
