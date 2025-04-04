import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios.js'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError.js'



const ProductList = () => {

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  

  const fetchProductData = async()=>{

    const categoryId = params.category.split("-").slice(-1)[0]

    const subCategoryId = params.subCategory.split("-").slice(-1)[0]

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data : {
          categoryId : categoryId,
          subCategoryId : subCategoryId,
          page : page,
          limit : 10
        }
      })

      const {data : responseData} = response

      if(responseData.success){
        if(responseData.page === 1){
          setData(responseData.data)
        }else{
          setData([...data,...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProductData()
  }, [params])

  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container sticky top-24 mx-auto grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]'>
          {/* sub category */}
          <div className='min-h-[76vh]'>
              sub category
          </div>


          {/* Product */}
          <div className=''>
            Product
          </div>
      </div>
    </section>
  )
}

export default ProductList