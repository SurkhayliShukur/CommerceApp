import { createContext, useState, useEffect } from "react";
import axios from "axios";


const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const [product, setProduct] = useState([])
    const [open, setOpen] = useState(false)
    // filter hissəsi
    const [filter,setFilter] = useState({
        minPrice:"",
        maxPrice:"",
        rating:"",
        search:""
    })

    const applyFilter = () => {
        const filtered = [...product];

        if(filter.minPrice !== ""){
            filtered = filtered.filter((products) => products.price >= parseFloat(filter.minPrice) )
        }
        if(filter.maxPrice !== ""){
            filtered = filtered.filter((products) => products.price <= parseFloat(filter.maxPrice) )
        }

        if(filter.rating !== ""){
            filtered = filtered.filter((products) => products.price >= parseFloat(filter.rating) )
        }
        if (filter.search !== "") {
            filtered = filtered.filter((products) => {
              const titleMatches = products.title
                .toLowerCase()
                .includes(filter.search.toLowerCase());
              const categoryMatches = products.category
                .toLowerCase()
                .includes(filter.search.toLowerCase());
      
              return titleMatches || categoryMatches;
            });
          }
      
    }


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
