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

    console.log("cartItem", cartItem);

    // Checking this item is cart or not
    useEffect(() => {
        const checkingitem = cartItem.some(item => item.productId?._id === data?._id)
        setIsAvailableCart(checkingitem)

        const product = cartItem.find(item => item.productId._id === data?._id)
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

    const increaseQty = (e) => {
        e.preventDefault()
        e.stopPropagation();

        updateCartItem(cartItemDetails?._id, qty + 1)

    }
    const decreaseQty = (e) => {
        e.preventDefault()
        e.stopPropagation();

        if (qty === 1) {
            deleteCartItem(cartItemDetails?._id);
           
        } else {
            updateCartItem(cartItemDetails?._id, qty - 1)
        }
    }

    return (
        <div className='w-full max-w-[150px]'>
            {
                isAvailableCart ? (
                    <div className='flex items-center gap-2 w-full h-full'>
                        <button onClick={decreaseQty} className='bg-red-400 hover:bg-red-500 text-red-800 px-3 lg:px-2 py-1 rounded'>
                            <FaMinus />
                        </button>
                        <p className='flex flex-1 items-center justify-center w-full font-semibold px-1 bg-gray-300 rounded'>{qty}</p>
                        <button onClick={increaseQty} className='bg-green-400 hover:bg-green-500 text-green-800 px-3 py-1 lg:px-2 rounded'>
                            <FaPlus />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleADDToCart}
                        className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
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