import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/cart/Cart'
import Home from './pages/home/Home'
import ProductDetails from './components/productDetails/ProductDetails'
import TotalProducts from './components/totalproducts/TotalProducts'
import PlaceOrder from './pages/PlaceHolder/PlaceOrder'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/totalProducts' element={<TotalProducts />} />
        <Route path='/placeorder' element={<PlaceOrder />} />



      </Routes>
    </>
  )
}

export default App
