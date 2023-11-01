import React, { useContext } from 'react'
import { ProductContext } from '../../../Context/ProductContext'
import { useSelector } from 'react-redux';
import { CiWallet } from "react-icons/ci"

const Header = () => {
  const { open, setOpen } = useContext(ProductContext)
  const totalAmount = useSelector(
    (state) => state.persistedReducer.basket.totalAmount
  )
  return (
    <>
      <header>
        <nav className='bg-gray-50'>
          <div className="container mx-auto  flex items-center justify-between h-full
          font-primary text-4xl p-3 text-primary">
            <h1>Senior.az</h1>
            <button className='flex relative mr-5' onClick={() => {
              setOpen(!open)
            }}>
              <CiWallet className="text-4xl text-cyan-600  cursor-pointer" />
              <div className="bg-gega-red absolute -right-6 bottom-6 text-[12px] w-6 h-6  rounded-full flex justify-center items-center">
                {totalAmount}
              </div>
            </button>
          </div>

        </nav>


      </header>
    </>
  )
}

export default Header