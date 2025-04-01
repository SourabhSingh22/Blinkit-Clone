import React from 'react'

const CardLoading = () => {
  return (
    <div className='p-4 border grid gap-3 max-w-52 rounded shadow animate-pulse'>
        <div className='min-h-20 bg-blue-50 rounded '>
        </div>

        <div className='p-3 bg-blue-50 rounded w-20'>
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

export default CardLoading