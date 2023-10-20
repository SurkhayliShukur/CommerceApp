import { createContext, useState, useEffect } from "react";
import axios from "axios";


const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const [product, setProduct] = useState([])
    const [open, setOpen] = useState(false)


    const getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:4400/products")
            if (res.status !== 200) {
                console.log(error)
            }
            else {
                setProduct(res.data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const value = {
        product,
        setProduct,
        open,
        setOpen
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}
export { ProductContext, ProductContextProvider }
