import React from 'react'

const CategoryPage = () => {
  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
          <h2 className='font-semibold'>Category</h2>
          <button className='text-sm px-3 py-1 border border-amber-500 rounded hover:bg-amber-300 cursor-pointer'>Add Category</button>
      </div>
    </section>
  )
}

export default CategoryPage