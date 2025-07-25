import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cartItem",
    initialState: initialState,
    reducers: {
        handleAddItemCart: (state, action) => {
            state.cart = [...action.payload];
        },
        // clearCart: (state) => {
        //     state.cart = []; // ✅ This clears the cart on logout
        // }
    }
});

export const { handleAddItemCart } = cartSlice.actions;

export default cartSlice.reducer;
