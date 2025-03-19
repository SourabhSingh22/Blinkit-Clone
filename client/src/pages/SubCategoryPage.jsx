import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const SubCategoryPage = () => {

  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])

  const [loading, setLoading] = useState(false)
 
  const fetehSubCategory = async() =>{
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })

      const {data : responseData} = response

      if(responseData.success){
         setData(responseData.data)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetehSubCategory()
  },[])

  console.log("subcategorydata", data);
  

  return (
    <section>
      <div className='flex bg-white p-2 align-center justify-between shadow-md'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={()=> setOpenAddSubCategory(true)} className='border border-yellow-300 px-3 py-1 rounded text-sm hover:bg-yellow-300'>Add Sub Category</button>
      </div>

      {
        openAddSubCategory && (
          <UploadSubCategoryModel
            close={() => setOpenAddSubCategory(false)}
          />
        )
      }
    </section>
  )
}

export default SubCategoryPage