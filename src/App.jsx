import React from 'react'
import './App.css'
import Home from './pages/Home'
import Login from "./pages/Register/Login"
import { Routes,Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from './Components/Sidebar'
import AddProduct from './admin/page/Addproduct';
import SignUp from './pages/Register/SignUp'

function App() {

  return (
    <>
    <Routes>
     <Route path='/' element = {<Home/>} />
     <Route path='/addproduct' element = {<AddProduct/>} />
     <Route path='login' element = {<Login/>}/>
     <Route path='signup' element = {<SignUp/>}/>
    </Routes>
    <Sidebar/>
    <ToastContainer/>
    </>
  )
}

export default App
