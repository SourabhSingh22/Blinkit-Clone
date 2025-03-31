import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError.js'
import Axios from '../utils/Axios'
import Loading from '../components/Loading.jsx'
import ProductCardAdmin from '../components/ProductCardAdmin.jsx'
import { IoSearchOutline } from 'react-icons/io5'

const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search, setSearch] = useState("")

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 10,
          search : search,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage)
        setProductData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [page])

  const handleNextPage = () => {
    if (page !== totalPageCount) {
      setPage(preve => preve + 1)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(preve => preve - 1)
    }
  }

  const handleOnChange = (e) =>{
    const {value} = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(()=>{
    let flag = true

    const interval = setTimeout(() => {
      if(flag){
        fetchProductData()
        flag = false
      } 
    }, 300)

    return () => {
      clearTimeout(interval)
    }
  }, [search])

  return (
    <section>
      <div className='bg-red-200 p-2 flex items-center justify-between shadow-md gap-4'>
          <h2 className='font-semibold'>Product</h2>
          <div className='min-w-24 border focus-within:border-blue-300 h-full bg-blue-50 px-4 flex items-center gap-3 p-2 rounded w-full ml-auto max-w-56'>
            <IoSearchOutline size={25} />
            <input
             onChange={handleOnChange}
             type=""
             placeholder='Search product here...'
             className='h-full w-full outline-none bg-transparent'
             value={search}
              />
        </div>
      </div>
      {
        loading && (
          <Loading />
        )
      }

      <div className='p-4 bg-blue-50'>
        <div className='min-h-[55vh]'>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {
              productData.map((p, index) => {
                return (
                  <ProductCardAdmin data={p} />
                )
              })
            }
          </div>
        </div>

        <div className='flex justify-between my-4'>
          <button onClick={handlePreviousPage} className='border border-yellow-400 px-4 py-1 hover:bg-yellow-500'>Previous</button>
          <button className='w-full bg-gray-200'>{page}/{totalPageCount}</button>
          <button onClick={handleNextPage} className='border border-yellow-400 px-4 py-1 hover:bg-yellow-500'>Next</button>
        </div>
      </div>


    </section>
  )
}

export default ProductAdmin