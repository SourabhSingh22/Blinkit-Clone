import React from 'react'

const ProductCardAdmin = ({data}) => {
  return (
    <div className='w-36 h-56 p-4 bg-white rounded'>
        <div>
            <img
             src={data?.image[0]}
             alt={data?.name} 
             className='h-32 object-scale-down'
             />
          </div>
        <p className=' lg:text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
        <p className='text-slate-400 text-ellipsis line-clamp-1'>{data?.unit}</p>
    </div>
  )
}

export default ProductCardAdmin