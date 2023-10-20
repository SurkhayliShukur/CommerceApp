import React from 'react'
import './App.css'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import Sidebar from './Components/Sidebar'

function App() {

  return (
    <>
    <Routes>
     <Route path='/' element = {<Home/>} />
    </Routes>
    <Sidebar/>
    </>
  )
}

export default App
