import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    arr: JSON.parse(localStorage.getItem("arr")) || [],
    sumCourses: JSON.parse(localStorage.getItem("sumCourses")) || 0,
    finalPrice: JSON.parse(localStorage.getItem("finalPrice")) || 0
}

const updateLocalStorage = (state) => {
    localStorage.setItem("arr", JSON.stringify(state.arr))
    localStorage.setItem("sumCourses", JSON.stringify(state.sumCourses))
    localStorage.setItem("finalPrice", JSON.stringify(state.finalPrice))
}
export const cartSlice = createSlice({

    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {

            let index = state.arr.findIndex(item => item._id === action.payload._id)
            if (index == -1)
                state.arr.push({ ...action.payload, qty: 1 })
            else
                state.arr[index].qty += 1;
            state.sumCourses++;
            state.finalPrice += action.payload.price;
            updateLocalStorage(state)
        },
        remove: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload._id)
            state.arr.splice(index, 1);
            state.sumCourses -= action.payload.qty;
            state.finalPrice -= action.payload.price * action.payload.qty;
            updateLocalStorage(state)
        },
        reduce: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id)
            state.arr[index].qty--
            if (state.arr[index].qty == 0)
                state.arr.splice(index, 1);
            state.sumCourses--;
            state.finalPrice -= action.payload.price;
            updateLocalStorage(state)
        },
        emptyCart: (state, action) => {
            state.arr = [];
            state.sumCourses = 0;
            state.finalPrice = 0
            updateLocalStorage(state)
        }
    }
})

export const { addToCart, remove, reduce, emptyCart } = cartSlice.actions
export default cartSlice.reducer