import React from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { validURLConvert } from '../utils/ValidURL.Convert'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

  const loadingCategory = useSelector((state) => state.product.loadingCategory)

  const categoryData = useSelector((state) => state.product.allCategory)
  const subCategoryData = useSelector((state) => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductList = (id, cat) =>{
    console.log(id, cat)
    const subcategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => {
        return c._id == id
      })

      return filterData ? true : null
    })

    

    const url  = `/${validURLConvert(cat)}-${id}/${validURLConvert(subcategory.name)}-${subcategory._id}`

    navigate(url)

    console.log(url)
  }

  return (
    <section className='bg-white px-6'>
      <div className=' container mx-auto'>
        <div className={` w-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2"} `}>
          <img
            src={banner}
            className='w-full h-full hidden lg:block'
            alt="banner" />

          <img
            src={bannerMobile}
            className='w-full h-full lg:hidden'
            alt="banner" />
        </div>
      </div>

      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
        {
          loadingCategory ? (
            new Array(20).fill(null).map((c, index) => {
              return (
                <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                  <div className='bg-blue-100 min-h-24 rounded'></div>
                  <div className='bg-blue-100 h-8 rounded'> </div>
                </div>
              )
            })
          ) : (
            categoryData.map((cat, index) => {
              return (
                <div key={cat._id+"displayCategory"} onClick={()=> handleRedirectProductList(cat._id, cat.name)}>
                  <div>
                    <img
                      src={cat.image}
                      className='w-full h-full object-scale-down'
                      alt="" />
                  </div>
                </div>
          )
        })
        )
        }
      </div>

        {/* display category product */}
        <div>
          <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
            <h3 className='font-semibold text-lg md:text-xl'>Dairy, Bread & Eggs</h3>
            <Link to="" className=' text-green-600 hover:text-green-400'>See All</Link>
          </div>
        </div>

        <div>
          
        </div>

    </section>
  )
}

export default Home