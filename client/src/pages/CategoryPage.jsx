import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const CategoryPage = () => {

  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [loading, setLoading] = useState(false)

  const [categoryData, setCategoryData] = useState([])

  const fetchCategory = async() => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getCategory
      })

      const {data : responseData} = response

      if(responseData.success){
        setCategoryData(responseData.data)
      }


    } catch (error) {

    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchCategory()
  }, [])

  return (
    <section>
      <div className='p-2 bg-white flex items-center justify-between shadow-md '>
        <h2 className='font-semibold'>Category</h2>

        <button onClick={()=> setOpenUploadCategory(true)} className='text-sm border border-yellow-500 hover:bg-yellow-400 px-3 py-1 rounded'>Add Category</button>
      </div>

      {
        !categoryData[0] && !loading && (
          <NoData/>
        )
      }

      <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
        {
          categoryData.map((category, index)=>{
            return(
              <div className='w-28 h-48 rounded shadow-md bg-slate-50'>
                  <img
                    alt={category.name}
                    src={category.image}
                    className='w-full object-scale-down'
                  />
              </div>
            )
          })
        }
      </div>

      {
        loading && (
          <Loading/>
        )
      }


      {
        openUploadCategory && (
          <UploadCategoryModel fetchData={fetchCategory} close={()=> setOpenUploadCategory(false)} /> 
        )
      }
    </section>
  )
}

export default CategoryPage