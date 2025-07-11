import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CartProduct from './CartProduct'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { validURLConvert } from '../utils/ValidURL.Convert'


const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector((state) => state.product.allSubCategory)

    const loadingCartNumber = new Array(5).fill(null)


    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
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
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }



    const handleRedirectProductList = () =>{
        // console.log(name,id);
        
    
        const subcategory = subCategoryData.find(sub => {
          const filterData = sub.category.some(c => {
            return c._id == id
          })
    
          return filterData ? true : null
        })
        
        // console.log(subcategory);  
        
        const url  = `/${validURLConvert(name)}-${id}/${validURLConvert(subcategory?.name)}-${subcategory?._id}`
    
        return url
    
      }

    const redirectURL = handleRedirectProductList();

    return (

        <div>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link to={redirectURL} className=' text-blue-600 hover:text-blue-400'>See All</Link>
            </div>

            <div className='relative flex items-center'>
                <div className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto p-4 overflow-x-scroll scroll-smooth scrollbar-none' ref={containerRef}>
                    {
                        loading &&
                        loadingCartNumber.map((_, index) => {
                            return (
                                <CardLoading key={"CategroywiseProductDisplay123" + index} />
                            )
                        })
                    }

                    {
                        data.map((p, index) => {
                            return (
                                <CartProduct data={p} key={p._id + "CategroywiseProductDisplay"} />
                            )
                        })
                    }


                </div>

                <div className='w-full left-0 right-0 container mx-auto px-2 absolute  justify-between hidden lg:flex'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-100 text-lg shadow-lg p-2 rounded-full'>
                        <FaAngleRight />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay