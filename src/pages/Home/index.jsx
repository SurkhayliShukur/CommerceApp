import React, { useContext } from 'react'
import Layout from '../../Components/layout/Layout'
import { ProductContext } from '../../Context/ProductContext'
import Product from '../../Components/Product'

const Home = () => {
  const { state } = useContext(ProductContext)
  return (
    <>
      <Layout>
        <div className='grid grid-cols-3 m-2'>
          {
            state.product.map((product) => (
              <Product key={product.id} product={product} />
            ))
          }
        </div>
      </Layout>
    </>
  )
}

export default Home