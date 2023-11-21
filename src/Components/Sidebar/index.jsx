import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductContext } from '../../Context/ProductContext';
import CardItem from '../CardItem';

const Sidebar = () => {
    const {state ,setState} = useContext(ProductContext)
    const card = useSelector((state) => state.persistedReducer.basket.basket);
    const totalPrice = useSelector((state) => state.persistedReducer.basket.totalPrice);
    const totalAmount = useSelector((state) => state.persistedReducer.basket.totalAmount);
    console.log("totalAmount")
  return (
   <>
      <div  className={`${
          state.open ? "right-0" : "-right-full"
        } w-full bg-white  fixed top-0 h-full shadow-2xl md:w-[30vw] 
         xl:max-w-[30vw] mt-14 transition-all duration-500 px-4 lg:px-[35px] `}>
          <div   className="flex justify-between items-center py-6 border-b border-red-400"
          onClick={() => {
            setState({open:false})
          }}>
            <p className='uppercase text-md font-semibold'>
              Bag  (<span className='text-red-500'>{totalAmount}</span>)
            </p>
          </div>
          <div className='flex flex-col gap-y-2 h-[550px] lg:h-[600px] border-b overflow-y-auto overflow-x-hidden'>
                {
                  card.map((product) => (
                    <CardItem key={product.id}  product = {product}/>
                  ))
                }
            </div>

      </div>
   </>
  )
}

export default Sidebar