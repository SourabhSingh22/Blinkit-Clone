import React from 'react'

const CartProduct = ({data}) => {
  return (
    <div className='p-4 border grid gap-3 max-w-52 rounded'>
    <div className='min-h-20 max-h-32 rounded '>
        <img
         src={data.image[0]} 
         className='w-full h-full object-scale-down scale-125'
         alt="" />
    </div>

    <div className='p-[1px] px-2 rounded w-fit text-sm text-green-600 bg-green-50'>
        10 min
    </div>

    <div className='p-3 bg-blue-50 rounded'>
    </div>

    <div className='p-3  bg-blue-50 w-14'>
    </div>

    <div className='flex gap-3 items-center justify-between'>
        <div className='p-3 bg-blue-50 rounded w-20'>
        </div>
        <div className='p-3 bg-blue-50 rounded w-20'>
    </div>
    </div>

</div>
  )
}

export default CartProduct