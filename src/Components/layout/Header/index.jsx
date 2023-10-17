import React from 'react'
import {CiWallet} from "react-icons/ci"

const Header = () => {
  return (
   <>
      <header>
        <nav className='bg-gray-50'>
        <div className="container mx-auto  flex items-center justify-between h-full
          font-primary text-4xl p-3 text-primary">
          <h1>Senior.az</h1>
          <button className=''>
          <CiWallet className="text-4xl text-cyan-600  cursor-pointer"/>
        </button>
        </div>
      
        </nav>
       

      </header>
   </>
  )
}

export default Header