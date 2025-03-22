import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage'
import {LuPencil} from 'react-icons/lu'
import {MdDelete} from 'react-icons/md'


const SubCategoryPage = () => {

  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])

  const [loading, setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [ImageURL, setImageURL] = useState("")

  const fetehSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })

      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetehSubCategory()
  }, [])

  const column = [
    columnHelper.accessor('name', {
      header: "Name"
    }),
    columnHelper.accessor('image', {
      header: "Image",
      cell: ({ row }) => {
        return <div className='flex justify-center items-center'>
          <img
            src={row.original.image}
            alt={row.original.name}
            className='w-8 h-8 cursor-pointer'
            onClick={()=>
               setImageURL(row.original.image)
              }
          />
        </div>
      }
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell :   ({row}) =>{
        return (
          <>
            {
              row.original.category.map((c, index)=>{
                return (
                  <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
                )
              })
            }
          </>
        )
      }
    }),
    columnHelper.accessor("_id", {
      header : "Action",
      cell : ({row})=>{
        return (
          <div>
              <button>
                  <LuPencil size={20}/>
              </button>
              <button>
                  <MdDelete size={20}/>
              </button>
          </div>
        )
      }
    })
  ]

  console.log("subcategorydata", data);


  return (
    <section>
      <div className='flex bg-white p-2 align-center justify-between shadow-md'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={() => setOpenAddSubCategory(true)} className='border border-yellow-300 px-3 py-1 rounded text-sm hover:bg-yellow-300'>Add Sub Category</button>
      </div>

      <div>
        <DisplayTable
          data={data}
          column={column}
        />
      </div>

      {
        openAddSubCategory && (
          <UploadSubCategoryModel
            close={() => setOpenAddSubCategory(false)}
          />
        )
      }

      {
        ImageURL && (
          <ViewImage url={ImageURL} close={()=> setImageURL("")}/>
        )
        
      }

    </section>
  )
}

export default SubCategoryPage