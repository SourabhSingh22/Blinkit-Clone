import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { useGlobalContext } from '../provider/GlobalProvider'
import { MdDelete, MdEdit } from 'react-icons/md'
import EditAddress from '../components/EditAddressDetails'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'

const Address = () => {
  // const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  // const [selectAddress, setSelectAddress] = useState(0)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const { fetchAddress } = useGlobalContext()

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: {
          _id: id
        }
      })

      console.log("delete response", response)

      if (response.data.success) {
        toast.success("Address Remove") // ✅ success popup
        if (fetchAddress) {
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className=''>
      <div className='bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center '>
        <h2 className='font-semibold text-ellipsis line-clamp-1'>Address</h2>
        <button onClick={() => setOpenAddress(true)} className='border border-yellow-400 text-yellow-300 py-1 px-3 rounded-full hover:bg-yellow-400 hover:text-white' >
          Add Address
        </button>
      </div>
      <div className='bg-blue-50 p-2 grid gap-4 rounded'>
        {
          addressList.map((address, index) => {
            console.log("address:", address);

            return (

              <div key={"address" + index} className={`border rounded p-3 flex justify-between gap-2 bg-white ${!address.status && 'hidden'}`}>

                <div className='w-full'>
                  <p>{address?.address_line || "No address line"}</p>
                  <p>{address?.city || "No city"}</p>
                  <p>{address?.state || "No state"}</p>
                  <p>{address?.country || "No country"} - {address?.pincode || "No pincode"}</p>
                  <p>{address?.mobile || "No mobile"}</p>
                </div>

                <div className='flex flex-col gap-6'>
                  <button
                    onClick={() => {
                      setOpenEdit(true)
                      setEditData(address)
                    }}

                    className='bg-green-200 p-1 rounded hover:bg-green-700 hover:text-white'>
                    <MdEdit />
                  </button>
                  <button onClick={() => handleDisableAddress(address._id)} className='bg-red-200 p-1 rounded hover:bg-red-700 hover:text-white' >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )
          })
        }
        <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dotted flex justify-center items-center cursor-pointer'>
          Add address
        </div>
      </div>

      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }

      {
        openEdit && (
          <EditAddress
            data={editData}
            close={() => setOpenEdit(false)} />
        )
      }
    </div>
  )
}

export default Address