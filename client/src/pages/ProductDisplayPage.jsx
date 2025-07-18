import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.jpg'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data, setData] = useState({
    name: '',
    image: [],
  })


  const [image, setImage] = useState(0)

  const [loading, setLoading] = useState(false)

  const imageContainer = useRef()

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
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
    fetchProductDetails()
  }, [params])

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft += 100
  }

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft -= 100
  }

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2'>
      <div className=''>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh]  min-h-56 max-h-56 rounded h-full w-full'>
          <img
            src={data.image[image]}
            alt=""
            className='h-full w-full object-scale-down'
          />
        </div>
        <div className='flex items-center justify-center gap-3 my-2'>
          {
            data.image.map((img, index) => {
              return (
                <div key={img + index + "point"} className={`bg-slate-200 lg:w-5 lg:h-5 h-3 w-3 rounded-full ${index === image && "bg-slate-500"}`}>

                </div>
              )
            })
          }
        </div>

        <div className='grid relative'>
          <div ref={imageContainer} className='z-10 flex gap-4 w-full min-h-20 min-w-20 overflow-x-auto scrollbar-none relative'>
            {
              data.image.map((img, index) => {
                return (
                  <div className='w-20 h-20 bg-slate-200 rounded shadow cursor-pointer' key={img + index}>
                    <img
                      src={img}
                      className='w-full h-full object-scale-down rounded'
                      alt="min-product"
                      onClick={() => setImage(index)}
                    />
                  </div>
                )
              })
            }
          </div>
          <div className='w-full h-full flex justify-between absolute -ml-3 items-center'>
            <button onClick={handleScrollLeft}>
              <FaAngleLeft className='z-10 bg-white rounded-full shadow-lg p-1 text-2xl relative' />
            </button>

            <button onClick={handleScrollRight}>
              <FaAngleRight className='z-10 bg-white rounded-full shadow-lg p-1 text-2xl relative' />
            </button>

          </div>
        </div>
        <div>

        </div>

        <div className='my-4 hidden lg:grid gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              <div>
                <p className='font-semibold'>{element}</p>
                <p className='text-base'>{data?.more_details[element]}</p>
              </div>
            })
          }
        </div>

      </div>

      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <p className='bg-green-400 w-fit rounded-full px-2 shadow'>10 Min</p>
        <h2 className='text-lg lg:text-2xl font-semibold'>{data.name}</h2>
        <p className='bg-blue-400 w-fit rounded text-white shadow px-2'>{data.unit}</p>
        <Divider className='my-2' />
        <div>
          <p className='text-lg'>Price</p>
          <div className='flex items-center gap-2 lg:gap-4'>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}</p>
            </div>
            {
              data.discount && (
                <p className='line-through text-lg'>{DisplayPriceInRupees(data.price)}</p>
              )
            }
            {
              data.discount && (
                <p className='font-bold text-green-600 lg:text-2xl'>{data.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
              )
            }
          </div>
        </div>
        {
          data.stock === 0 ? (
            <p className='text-lg text-red-500 my-2'>Out of Stock</p>
          ) : (
            // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
            <div className='my-4'>
              <AddToCartButton data={data}/>
            </div>
          )
        }


        <h2 className='font-semibold'>Why shop from blinkit ?</h2>
        <div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image1}
              alt="superfast delivery"
              className='rounded-full object-scale-down w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Superfast Delivery</div>
              <p>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
            </div>
          </div>
          {/*  */}
          <div className='flex items-center     gap-4 my-4'>
            <img
              src={image1}
              alt="Best prices offers"
              className='rounded-full object-scale-down w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Best Prices & Offers</div>
              <p>Best price destination with offers directly from the manufacturers.</p>
            </div>
          </div>
          {/*  */}
          <div className='flex items-center     gap-4 my-4'>
            <img
              src={image1}
              alt="Wide Assortment"
              className='rounded-full object-scale-down w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Wide Assortment</div>
              <p>Choose from 5000+ products across food personal care , household & other category</p>
            </div>
          </div>
        </div>

        {/* only mobile */}
        <div className='my-4 grid gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              <div>
                <p className='font-semibold'>{element}</p>
                <p className='text-base'>{data?.more_details[element]}</p>
              </div>
            })
          }
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPage