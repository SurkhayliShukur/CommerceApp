import { createContext, useState,useEffect } from "react";
import axios from "axios";

const Context = createContext();

export const ContextProvider = ({children}) => {
    const [product,setProduct] = useState([]);
    
    const getJsonData = async() => {
        try{
            const res = await axios.get("http://localhost:4400/products")
            if(res.status !==200){
                console.log(error)
            }
            else(setProduct(res.data));
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        getJsonData()
    },[])
    

   const value = {
        product,setProduct
    }


    return(
        <Context.Provider value = {value}>
            {children}
        </Context.Provider>
    )
}
export default Context