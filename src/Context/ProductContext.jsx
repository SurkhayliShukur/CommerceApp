import { createContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {


    const [state, setState] = useReducer((prevState, nextState) => ({ ...prevState, ...nextState }),
        {
            product: [],
            open: false,
            filter: {
                minPrice: "",
                maxPrice: "",
                rating: "",
                search: ""
            },
            categories: [],
        }
    )


    const applyFilter = () => {
        const filtered = [state.product];

        if (state.filter.minPrice !== "") {
            filtered = filtered.filter((products) => products.price >= parseFloat(state.filter.minPrice))
        }
        if (state.filter.maxPrice !== "") {
            filtered = filtered.filter((products) => products.price <= parseFloat(state.filter.maxPrice))
        }

        if (state.filter.rating !== "") {
            filtered = filtered.filter((products) => products.price >= parseFloat(state.filter.rating))
        }
        if (state.filter.search !== "") {
            filtered = filtered.filter((products) => {
                const titleMatches = products.title
                    .toLowerCase()
                    .includes(state.filter.search.toLowerCase());
                const categoryMatches = products.category
                    .toLowerCase()
                    .includes(state.filter.search.toLowerCase());

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
              setState({categories:request.data})
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
                // setProduct(res.data)
                setState({product:res.data})
            
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
    }, [state.filter, state.product])

   const value = {
     state,
     setState
   }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}
export { ProductContext, ProductContextProvider }
