import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { validURLConvert } from '../utils/ValidURL.Convert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'

const CartProduct = ({ data }) => {

    const url = `/product/${validURLConvert(data.name)}-${data._id}`

    return (
        <Link to={url} className='lg:p-4 py-2 border grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded bg-white'>
            <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
                <img
                    src={data?.image?.[0]}
                    className='w-full h-full object-scale-down ;lg:scale-125'
                    alt="" />
            </div>

            <div className='flex items-center gap-1'>
                <div className='p-[1px] px-2 rounded w-fit text-xs text-green-600 bg-green-50'>
                    10 min
                </div>

                <div>
                    {
                        Boolean(data.discount) && (
                            <p className='text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full'>{data.discount}% discount</p>
                        )
                    }
                </div>
            </div>

            <div className='px-2 lg:px-0 font-medium text-ellipsis line-clamp-2 text-sm lg:text-base'>
                {data.name}
            </div>

            <div className='w-fit px-2 lg:px-0 text-sm lg:text-base'>
                {data.unit}

            </div>

            <div className='px-2 flex gap-1  lg:gap-3 items-center justify-between text-sm lg:text-base lg:px-0'>
                <div className='flex items-center gap-1'>
                    <div className='font-semibold text-sm'>
                        {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
                    </div>


                </div>
                <div className=''>
                    {
                        data.stock == 0 ? (
                            <p className='text-red-500 text-sm text-center'>Out of stock</p>
                        ) : (
                            <button className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
                                Add
                            </button>
                        )
                    }

                </div>
            </div>

        </Link>
    )
}

export default CartProduct