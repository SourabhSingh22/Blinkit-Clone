import { createContext, useContext, useEffect, useState } from 'react';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import { handleAddItemCart } from '../store/cartProduct';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';;
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import { use } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { handleAddAddress } from '../store/addressSlice';

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const cartItem = useSelector((state) => state?.cartItem.cart)
    const [notDiscountTotalPrice, setNotDiscountPrice] = useState(0);
    const user = useSelector(state => state?.user)
    
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

    const updateCartItem = async (id, qty) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateCartItem,
                data: {
                    _id: id,
                    qty: qty
                }
            })
            const { data: responseData } = response

            if (responseData.success) {
                // toast.success(responseData.message)
                fetchCartItem()
                return responseData
            }

        } catch (error) {
            
            AxiosToastError(error)
            return error
        }
    }

    const deleteCartItem = async (cartId) => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCartItem,
                data: {
                    _id: cartId
                }
            })

            const { data: responseData } = response


            if (responseData.success) {
                toast.success(responseData.message)
                fetchCartItem()
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    useEffect(() => {
            const qty = cartItem.reduce((preve, curr)=>{
                return preve + curr.quantity;
            }, 0)
            setTotalQty(qty);
            // setTotalPrice()
            const tPrice = cartItem.reduce((prev, curr) => {
                return prev + (curr.productId?.price * curr?.quantity);
            }, 0)
            setTotalPrice(tPrice);

            const notDiscountedPrice = cartItem.reduce((prev, curr) => {
                return prev + (curr.productId?.price * curr?.quantity);
            }, 0) 

            setNotDiscountPrice(notDiscountedPrice);

        }, [cartItem]);

   

    const handleLogout = () => {
        localStorage.clear();
        dispatch(handleAddItemCart([]));
        // toast.success("Logout successfully")
    }

    const fetchAddress = async() =>{
        try {
            const response = await Axios({
                ...SummaryApi.getAddress,

            })

            const {data : responseData } = response

            if(responseData.success){
                dispatch(handleAddAddress(responseData.data))
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    useEffect(()=>{
        fetchCartItem()
        handleLogout()
        fetchAddress()
    },[user]);


    return (
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartItem,
            deleteCartItem,
            fetchAddress,
            totalPrice,
            totalQty, 
            notDiscountTotalPrice,
            // dispatch
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;