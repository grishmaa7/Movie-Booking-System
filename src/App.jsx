import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Home from "./pages/Home"
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import MyBooking from './pages/Mybookings'
import Footer from './pages/Footer'
import { seedFirestore } from './seed/seedData'
import Contact from './pages/Contact'
import Category from './pages/Category'
import BookingSystem from './pages/BookingSystem'


const App = () => {
  useEffect(() => {
    seedFirestore()
  }, [])
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/my-booking' element={<MyBooking />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/category' element={<Category />} />
        <Route path='/booking' element={<BookingSystem />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App