import { createContext, useContext, useEffect } from 'react';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import { handleAddItemCart } from '../store/cartProduct';
import { useDispatch } from 'react-redux';
import React from 'react';;
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {

    const dispatch = useDispatch()

    const fetchCartItem = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getCartItem
            })
            const { data: responseData } = response

            if (responseData.success) {
                dispatch(handleAddItemCart(responseData.data))
                console.log(responseData);

            }

        } catch (error) {
            toast.error(error.message || error)
        }
    }

    const updateCartItem = async(id, qty)=>{
        try {
            const response = await Axios({
                ...SummaryApi.updateCartItem,
                data : {
                    _id : id,
                    qty : qty
                }
            })
            const {data : responseData} = response

            if(responseData.success){
                toast.success(responseData.message)
                fetchCartItem()
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    const deleteCartItem = async(cartId) =>{
        try {
            const response = await Axios({
                ...SummaryApi.deleteCartItem,
                data : {
                    _id : cartId
                }
            })

            const {data : responseData} = response
            

            if(responseData.success){
                toast.success(responseData.message)
                fetchCartItem()
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    useEffect(()=>{
        fetchCartItem()
    },[])

    return (
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartItem,
            deleteCartItem,
            // dispatch
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;