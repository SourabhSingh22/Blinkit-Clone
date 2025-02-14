import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id : "",
    name : "",
    email : ""
}

const userSlice = {
    name : 'user',
    initialValue,
    reducers : {
        setUserDetails : (state, action) =>{
            
        }
    }
}