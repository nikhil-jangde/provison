import React from 'react'
import LoginPage from './Pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './Pages/ProductPage'
import AboutUsPage from './Pages/AboutUsPage'

function App() {
  return (
  <>
<Routes>
  <Route path='/' element={<LoginPage/>}/>
  <Route path='/products' element={<ProductPage/>}/>
  <Route path='/about' element={<AboutUsPage/>}/>
</Routes>
  </>
  
  )
}

export default App