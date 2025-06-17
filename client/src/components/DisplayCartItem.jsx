import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import empty_cart from '../assets/empty_cart.png'

const DisplayCartItem = ({ close }) => {

    const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage = () => {
        if(user?._id) {
            navigate("/checkout")
            if(close){
                close()
            }
            return
        }
        toast("Please login to continue")
    }

    return (
        <section className='bg-neutral-900 fixed top-0 left-0 bottom-0 right-0 bg-opacity-70 z-50'>
            <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
                <div className='flex items-center justify-between p-4 gap-3 shadow-md'>
                    <h2 className='font-semibold'>Cart</h2>
                    <Link to={"/"} className='lg:hidden hover:text-red-500'>
                        <IoClose size={25} />
                    </Link>
                    <button onClick={close} className='hover:text-red-500 hidden lg:block'>
                        <IoClose size={25} />
                    </button>
                </div>

                <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
                    {/* display items */}
                    {
                        cartItem[0] ? (
                            <>
                                <div className='flex items-center px-4 py-2 bg-blue-100 text-blue-500 rounded-full justify-between '>
                                    <p>Your total savings</p>
                                    <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
                                </div>
                                <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                                    {
                                        cartItem[0] && (
                                            cartItem.map((item, index) => {
                                                return (
                                                    <div key={item._id + "cartItemDisplay"} className='flex w-full gap-4 border-b-2 items-center'>
                                                        <div className='w-16 h-16
                                                min-h-16 min-w-16 bg-red-500'>
                                                            <img src={item?.productId?.image[0]} alt=""
                                                                className='object-scale-down'
                                                            />
                                                        </div>
                                                        <div className='w-full max-w-sm'>
                                                            <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                            <p className='text-xs text-neutral-400'>{item?.productId?.unit}</p>
                                                            <p className='text-xs text-green-600 font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                                        </div>
                                                        <div>
                                                            <AddToCartButton data={item?.productId} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </div>
                                
                                <div className='bg-white p-4 rounded-lg mt-4'>
                                    <h3 className='font-semibold'>Bill Details</h3>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Items total</p>
                                        <p className='text-sm flex items-center gap-2'><span className='line-through text-neutral-500'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span> <span>{DisplayPriceInRupees(totalPrice)}</span></p>
                                    </div>
                                     <div className='flex gap-4 justify-between ml-1'>
                                        <p className='text-sm'>Quntity total</p>
                                        <p className='text-sm flex items-center gap-2  font-bold'>{totalQty} items</p>
                                    </div>
                                     <div className='flex gap-4 justify-between ml-1'>
                                        <p className='text-sm'>Delivery Charge</p>
                                        <p className='text-sm flex items-center gap-2  font-bold'>Free</p>
                                    </div>
                                    <div className='flex items-center justify-between font-semibold'>
                                        <p >Grand total</p>
                                        <p>{DisplayPriceInRupees(totalPrice)}</p>
                                    </div>
                                </div>

                            </>
                        ) : (
                            <div className='bg-white flex flex-col items-center justify-center gap-4 h-full'>
                                <img 
                                src={empty_cart}
                                alt=""
                                className='w-full h-full object-scale-down' />
                                <Link onClick={close} to={"/"} className='block bg-green-600 px-4 py-2 text-white rounded'>Shop Now</Link>
                            </div>
                        )
                    }

                </div>

                {
                    cartItem[0] && (
                    <div className='p-2'>
                        <div className='bg-green-700 text-neutral-100 py-4 px-4 static botttom-0 font-bold text-base rounded flex items-center justify-between gap-3'>
                        <div>
                            {DisplayPriceInRupees(totalPrice)}
                        </div>

                        
                        <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
                            Proceed
                            <span><FaCaretRight /></span>
                        </button>
                        </div>
                    </div>
                    )
                }
            </div>
        </section>
    )
}

export default DisplayCartItem