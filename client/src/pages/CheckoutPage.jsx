import React, { useState } from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { useGlobalContext } from '../provider/GlobalProvider'

import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CheckoutPage = () => {

  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()

  const handleCashOnDelivery = async() =>{
    try {
      const response = await Axios({
        ...SummaryApi.cashOnDelivery,
        data : {
          list_items : cartItemsList,
          addressId: addressList[selectAddress]?._id,  
          subTotalAmt : totalPrice,
          totalAmt : totalPrice 
        }
      })

      const { data : responseData } = response

      if(responseData.success){
        toast.success(responseData.message)
        if(fetchCartItem){
          fetchCartItem()
        }
        navigate('/success',{
          state : {
            text : "Order"
          }
        });
 
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className='bg-blue-50 p-4'>
      <div className='container flex mx-auto p-4   flex-col lg:flex-row w-full gap-5 jusibfy-between'>
        <div className='w-full'>
          {/* address */}
          <h3 className='text-lg font-semibold'>Choose your address</h3>

          <div className='bg-white p-2 grid gap-4'>
            {
              addressList.map((address, index) => {
                console.log("address:", address);

                return (
                  <label key={"address"+index}  className={!address.status && 'hidden'}>
                    <div className='border rounded p-3 flex gap-2 hover:bg-gray-100 cursor-pointer'>
                      <div>
                        <input
                          id={"address"+index}
                          onChange={(e) => setSelectAddress(e.target.value)}
                          type="radio"
                          value={index}
                          name='address' className='cursor-pointer' />
                      </div>

                      <div>
                        <p>{address?.address_line || "No address line"}</p>
                        <p>{address?.city || "No city"}</p>
                        <p>{address?.state || "No state"}</p>
                        <p>{address?.country || "No country"} - {address?.pincode || "No pincode"}</p>
                        <p>{address?.mobile || "No mobile"}</p>
                      </div>
                    </div>
                  </label>
                )
              })
            }
            <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dotted flex justify-center items-center cursor-pointer'>
              Add address
            </div>
          </div>
        </div>

        <div className='w-full max-w-md bg-white py-4 px-2'>
          {/* summary */}
          <h3 className='text-lg font-semibold'>Summary</h3>
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
          <div className='w-full max-w-md flex flex-col gap-3'>
            <button className='py-2 px-4 bg-green-600 rounded text-white font-semibold hover:bg-green-700'>Online Payment</button>
            <button onClick={handleCashOnDelivery} className='py-2 px-4 border-2 border-green-600 text-green-600 hover:bg-green-500 rounded hover:text-white font-semibold'>Cash on Delivery</button>
          </div>

        </div>
      </div>

      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }
    </section>
  )
}

export default CheckoutPage