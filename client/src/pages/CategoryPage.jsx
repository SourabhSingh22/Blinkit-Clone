import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'


const CategoryPage = () => {

  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [loading, setLoading] = useState(false)

  const [categoryData, setCategoryData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  })

  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState({
    _id: ""
  })

  // const allCategory = useSelector(state => state.product.allCategory)
  
  // useEffect(()=>{
  //   setCategoryData(allCategory)
  // },[allCategory])

  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getCategory
      })

      const { data: responseData } = response

      if (responseData.success) {
        setCategoryData(responseData.data)
      }


    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchCategory()
        setOpenConfirmBoxDelete(false
        )
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-white flex items-center justify-between shadow-md '>
        <h2 className='font-semibold'>Category</h2>

        <button onClick={() => setOpenUploadCategory(true)} className='text-sm border border-yellow-500 hover:bg-yellow-400 px-3 py-1 rounded'>Add Category</button>
      </div>

      {
        !categoryData[0] && !loading && (
          <NoData />
        )
      }

      <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
        {
          categoryData.map((category, index) => {
            return (
              <div className="w-32 h-52 rounded shadow-md bg-white flex flex-col justify-between p-2" key={category._id}>
                <img
                  alt={category.name}
                  src={category.image}
                  className="w-full h-32 object-contain bg-white p-1"
                />
                <p className="text-center text-sm font-semibold mb-1 min-h-[40px]">{category.name}</p>
                <div className="flex items-center justify-center gap-2 pb-2">
                  <button onClick={() => {
                    setOpenEdit(true)
                    setEditData(category)
                  }} className="w-20 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded">
                    Edit
                  </button>

                  <button onClick={() => {
                    setOpenConfirmBoxDelete(true)
                    setDeleteCategory(category)
                  }} className="w-20 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">
                    Delete
                  </button>
                </div>

              </div>
            )
          })
        }


      </div>

      {
        loading && (
          <Loading />
        )
      }

      {
        openEdit && (
          <EditCategory
            data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />
        )
      }


      {
        openUploadCategory && (
          <UploadCategoryModel
            fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
        )
      }
      {
        openConfirmBoxDelete && (
          <ConfirmBox
            close={() => setOpenConfirmBoxDelete(false)}
            cancel={() => setOpenConfirmBoxDelete(false)}
            confirm={handleDeleteCategory}
          />
        )

      }

    </section>
  )
}

export default CategoryPage