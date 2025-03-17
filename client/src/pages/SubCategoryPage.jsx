import React, { useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'

const SubCategoryPage = () => {

  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)

  return (
    <section>
      <div className='flex bg-white p-2 align-center justify-between shadow-md'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={()=> setOpenAddSubCategory(true)} className='border border-yellow-300 px-3 py-1 rounded text-sm hover:bg-yellow-300'>Add Sub Category</button>
      </div>

      {
        openAddSubCategory && (
          <UploadSubCategoryModel
            close={() => setOpenAddSubCategory(false)}
          />
        )
      }
    </section>
  )
}

export default SubCategoryPage