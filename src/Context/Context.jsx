import axios from "axios";
import { createContext } from "react";

const ProductContext = createContext

const ProductContextProvider = ({children}) => {
    const [product,setProduct] = useState([])
    
    const getProduct = async () => {
        try{
            const res = await axios.get("https://dummyjson.com/products")
            if(res !== 200){
                console.log(error)
            }
            else{
                setProduct(res.data)
            }
        }
        catch(error){
            console.log(error)
        }
       
    }
    useEffect(() => {
        getProduct()
    },[])

    const value = {
        setProduct,product
    }

    return(
       <ProductContext.Provider value ={value}>
        {children}
       </ProductContext.Provider>
    )
}

export {ProductContextProvider,ProductContext}