import { createSlice } from "@reduxjs/toolkit";


export const initialState = {
    basket:[],
    amount:0,
    totalAmount:0,
    totalPrice:0
};

export const basketSlice = createSlice({
    name:"basket",
    initialState,
    reducers : {

    }
})

export default basketSlice.reducer