import React from 'react'
import './App.css'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from './Components/Sidebar'
import AddProduct from './admin/page/Addproduct';

function App() {

  return (
    <>
    <Routes>
     <Route path='/' element = {<Home/>} />
     <Route path='/addproduct' element = {<AddProduct/>} />
    </Routes>
    <Sidebar/>
    <ToastContainer/>
    </>
  )
}

export default App
