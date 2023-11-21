import React from 'react'
import { BsPlus } from "react-icons/bs"
import { useDispatch } from 'react-redux'
import { addToCart } from '../../features/slices/basketSlice'
import { toast } from 'react-toastify'



const Product = ({ product }) => {
  const { id, title, category, price, image, rating } = product
  const dispatch = useDispatch()

  const addToBag = () => {
    dispatch(
      addToCart({
        id: product.id,
        price: Number(product.price),
        amount: 1,
        image: product.image,
        title: product.title,
        description: product.description,
        rating: product.rating,
        brand: product.brand,
        category: product.category,
        totalPrice: Number(product.price)
      })
    );
    toast.success('Product added', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });

  };


  return (
    <>
     
      <div key={id} className='w-9/12 h-[340px]   mb-4 bg-slate-200 rounded-md border border-indigo-600 relative owerflow-hidden group transition'>
        <div className="w-full h-full flex justify-center  items-center flex-col">
          <div className="w-full flex justify-center items-center">
            <img
              src={image}
              alt={title}
              className=" -mt-[50px] h-[230px] w-[450px]  object-cover group-hover:scale-110 rounded-md transition duration-300"
            />

            <div className="absolute top-2 -right-4 group-hover:right-1 opacity-0 group-hover:opacity-100 transition duration-500">
              <button  onClick={addToBag} >
                <div className="flex justify-center items-center text-red-50 w-8 h-8 bg-blue-500 rounded-sm">
                  <BsPlus className='text-3xl' />
                </div>
              </button>
            </div>
          </div>

          <div className="mt-5 me-1 ">
            <div className="ml-0 md:ml-4 text-2xl md:text-lg">
              <div className="text-sm capitalize text-gray-600 dark:text-black font-semibold">
                Category:{category}
              </div>

              <div className="font-semibold text-violet-600 dark:text-cyan-200">
                Rating:{rating}
              </div>
              <div className="font-semibold text-green-600 dark:text-cyan-200">
                ${price}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product