import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'


const AddToCartButton = ({ data }) => {

    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailableCart, setIsAvailableCart] = useState(true)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemDetails] = useState()


    // Checking this item is cart or not
    useEffect(() => {
        const checkingitem = cartItem.some(item => item.productId?._id === data?._id)
        setIsAvailableCart(checkingitem)

        const product = cartItem.find(item => item.productId?._id === data?._id)
        setQty(product?.quantity)
        setCartItemDetails(product)

    }, [data, cartItem])

    const handleADDToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation();

        try {
            setLoading(true)

            const response = await Axios({
                ...SummaryApi.addToCart,
                data: {
                    productId: data?._id,
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }

    }

    const increaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation();

        const response = await updateCartItem(cartItemDetails?._id, qty + 1)

        if (response?.success) {
            toast.success("Item quantity increased");
        }

    }
    const decreaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation();

        if (qty === 1) {
            const response = await deleteCartItem(cartItemDetails._id);
            if (response?.success) {
                toast.success("Item removed from cart");
            }
            return; //yaha pe return likhna important tha
        }

        const response = await updateCartItem(cartItemDetails._id, qty - 1);
        if (response?.success) {
            toast.success("Item quantity decreased");
        }

    }

    return (
        <div className='w-full max-w-[100px]'>
            {
                isAvailableCart ? (
                    <div className='flex items-center lg:gap-2 gap-1 w-full h-full'>
                        <button onClick={decreaseQty} className='bg-red-400 hover:bg-red-500 text-red-800 px-1 py-1 lg:px-1  rounded'>
                            <FaMinus size={12} />
                        </button>
                        <p className='flex flex-1 items-center justify-center w-full px-1 rounded text-sm font-bold'>{qty}</p>
                        <button onClick={increaseQty} className='bg-green-400 hover:bg-green-500 text-green-800 px-1 py-1 lg:px-1 rounded'>
                            <FaPlus size={12} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleADDToCart}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-2 lg:px-4 py-1 rounded'>
                        {
                            loading ? <Loading /> : "Add"
                        }
                    </button>
                )
            }

        </div>
    )
}

export default AddToCartButton