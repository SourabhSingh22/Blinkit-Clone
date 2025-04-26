import React, { useEffect, useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import { IoClose } from 'react-icons/io5'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'

const ProductCardAdmin = ({data, fetchProductData, confirm, cancel}) => {

  const [editOpen, setEditOpen] = useState(false)

  const [openDelete, setOpenDelete] = useState(false)

  const handleDeleteCancel = () => {
    setOpenDelete(false)
  }

  const handleDelete = async() =>{
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data : {
          _id : data._id,
        }
      })

      const {data : responseData} = response

      if(responseData.success){
        toast.success(responseData.message)
        if(fetchProductData){
          fetchProductData()
        }
        setOpenDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className='p-4 bg-white rounded'>
        <div>
            <img
             src={data?.image[0]}
             alt={data?.name} 
             className='w-36 h-36 object-scale-down'
             />
          </div>
        <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
        <p className='text-slate-400 text-ellipsis line-clamp-1'>{data?.unit}</p>
        <div className='grid grid-cols-2 gap-3 py-3'>
          <button onClick={()=> setEditOpen(true)} className='border px-1 py-1 text-sm border-green-600 rounded bg-green-100 text-green-800 hover:bg-green-200'>Edit</button>
          <button className='border px-1 py-1 text-sm border-red-600 rounded bg-red-100 text-red-600' onClick={()=> setOpenDelete(true)}>Delete</button>
        </div>
          {
            editOpen && (
              <EditProductAdmin  fetchProductData={fetchProductData} data={data} close={()=> setEditOpen(false)}/>
            )
          }

          {
            openDelete && (
              <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-600 bg-opacity-70 z-50 p-4 flex justify-center items-center'>
                <div className='bg-white p-4 w-full max-w-md rounded-md shadow'>
                  <div className='flex justify-between items-center gap-4'>
                    <h3 className='font-semibold'>Permanent Delete</h3>
                    <button className='hover:text-red-600' onClick={()=> setOpenDelete(false)}>
                        <IoClose size={25}/>
                    </button>
                  </div>
                  <p className='my-2'>Are you sure want to delete permanent ?</p>
                  <div className='flex justify-end gap-5 py-3'>
                    <button onClick={handleDeleteCancel} className='border px-3 py-1 rounded bg-red-100 border-red-500 hover:bg-red-200 text-red-500'>Cancel</button>
                    <button onClick={handleDelete} className='border bg-green-100 border-green-500 px-3 py-1 rounded hover:bg-green-200 text-green-500'>Delete</button>
                  </div>
                </div>
              </section>
            )
          }
          
    </div>
  )
}
//
export default ProductCardAdmin