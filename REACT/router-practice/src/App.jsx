import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NavBar from './components/NavBar'
import Profile from './pages/Profile'
import Clock from './pages/Clock'
import Form, { FormControled, FormSuperControled } from './pages/Form'
import ProductsList from './pages/Products'
import StyledPage from './pages/StyledPage'

function App() {
  
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path='/about' element={ <About /> } />
        <Route path='/profile' element={ <Profile />} />
        <Route path='/clock' element={ <Clock />} />
        <Route path='/form' element={ <Form />} />
        <Route path='/formControlled' element={ <FormControled />} />
        <Route path='/formSuperControlled' element={ <FormSuperControled />} />
        <Route path='/products' element={ <ProductsList />} />
        <Route path='/styled' element={ <StyledPage></StyledPage>} />
      </Routes>
    </>
  )
}

export default App
