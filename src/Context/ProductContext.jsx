import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const [product, setProduct] = useState([])
    const [open, setOpen] = useState(false)
    // filter 
    const [filter, setFilter] = useState({
        minPrice: "",
        maxPrice: "",
        rating: "",
        search: ""
    })
    const [categories, setCategories] = useState([])

    const applyFilter = () => {
        const filtered = [...product];

        if (filter.minPrice !== "") {
            filtered = filtered.filter((products) => products.price >= parseFloat(filter.minPrice))
        }
        if (filter.maxPrice !== "") {
            filtered = filtered.filter((products) => products.price <= parseFloat(filter.maxPrice))
        }

        if (filter.rating !== "") {
            filtered = filtered.filter((products) => products.price >= parseFloat(filter.rating))
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

    const getAllCategories = async () => {
        try {
            const request = await axios.get("http://localhost:4400/categories")
            if (request.status !== 200) {
                throw new Error("Something went wrong")
            }
            else {
                setCategories(request.data)
            }
        } catch (error) {
            toast.error(error.message)
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
        getAllCategories()
    }, [])

    useEffect(() => {
        applyFilter()
    }, [filter, product])

    const value = {
        product,
        setProduct,
        open,
        setOpen,
        filter,
        setFilter,
        categories,
        setCategories
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}
export { ProductContext, ProductContextProvider }
