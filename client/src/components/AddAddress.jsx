import React from 'react'
import {useForm} from 'react-hook-form'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from 'react-icons/io5'
import { useGlobalContext } from '../provider/GlobalProvider'


const AddAddress = ({close}) => {

  const {register, handleSubmit, reset} = useForm()

  const {fetchAddress} = useGlobalContext()

  const onSubmit = async(data)=>{
    console.log("data", data);
    
    try {
      const response = await Axios({
        ...SummaryApi.addAddress,
        data : {
            address_line : data.addressline,
            city : data.city,
            state : data.state,
            country : data.country,
            pincode : data.pincode,
            mobile : data.mobile,
        }
      })

      const { data : responseData } = response

      if(responseData.success){
        toast.success(responseData.message)
        if(close){
          close()
          reset()
          fetchAddress()
        }
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-[100vh] overflow-scroll'>
       
        <div className='bg-white w-full p-4 max-w-md mt-8 mx-auto rounded'> 
            <div className='flex justify-between items-center gap-4'>
              <h2 className='font-semibold'>Add Address</h2>
              <button onClick={close} className='hover:text-red-600'>
                <IoClose size={25}/>
              </button>
            </div>
            <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-1'>
                    <label htmlFor='addressLine'>Address Line :</label>
                    <input
                     type="text" 
                     id='addressLine'
                     className='border bg-blue-50 p-2 rounded'
                     {...register("addressline", {required : true})}
                     />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='city'>City :</label>
                    <input
                     type="text" 
                     id='city'
                     className='border bg-blue-50 p-2 rounded'
                     {...register("city", {required : true})}
                     />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='state'>State :</label>
                    <input
                     type="text" 
                     id='state'
                     className='border bg-blue-50 p-2 rounded'
                     {...register("state", {required : true})}
                     />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor='pincode'>Pincode :</label>
                    <input
                     type="text" 
                     id='pincode'
                     className='border bg-blue-50 p-2 rounded'
                     {...register("pincode", {required : true})}
                     />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor='country'>Country :</label>
                    <input
                     type="text" 
                     id='country'
                     className='border bg-blue-50 p-2 rounded'
                     {...register("country", {required : true})}
                     />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor='moblie'>Moblie No. :</label>
                    <input
                     type="number" 
                     id='mobile'
                     className='border bg-blue-50 p-2 rounded'
                     {...register("mobile", {required : true})}
                     />
                </div>

                <button type='submit' className='bg-yellow-500 w-full py-2 font-semibold hover:bg-yellow-600 rounded'>Submit</button>
            </form>
        </div>
    </section>
  )
}

export default AddAddress