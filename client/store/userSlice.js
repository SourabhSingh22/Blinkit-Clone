import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id : "",
    name : "",
    email : "",
    avatar : "",
    mobile : ""
}

const userSlice = createSlice({
    name : 'user',
    initialState : initialValue,
    reducers : {
        setUserDetails : (state, action) =>{
            state.id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.avatar = action.payload.avatar
            state.mobile = action.payload.mobile
        }
    }
})

export const {setUserDetails} = userSlice.actions

export default userSlice.reducer