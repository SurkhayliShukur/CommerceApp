import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    basket: [],
    amount:0,
    totalAmount:0,
    totalPrice:0
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers:{
        addToCard: (state,action) => {
            const add = state.basket.find((product) => product.id === action.payload.id);
            if(add){
                add.amount++;
                add.totalAmount++;
                add.totalAmount += add.price
            }
            else{
                state.basket.push(action.payload)
                state.totalAmount++;
                state.totalPrice += action.payload.price
            }
        }, 

        clearBasket: (state) => {
            state.basket = [],
            state.totalPrice = 0,
            state.totalAmount = 0
        }
    }

})
export const {addToCard,clearBasket} = basketSlice.actions

export default basketSlice.reducer