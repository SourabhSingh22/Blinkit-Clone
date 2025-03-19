import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import uploadImage from '../utils/UploadImage'
import { useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const UploadSubCategoryModel = ({ close }) => {

    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        image: "",
        category: []
    })

    const allCategory = useSelector(state => state.product.allCategory)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSubCategoryData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadSubCategoryImage = async (e) => {
        const file = e.target.files[0]

        if (!file) {
            return;
        }

        const response = await uploadImage(file)
        const { data: ImageResponse } = response

        setSubCategoryData((preve) => {
            return {
                ...preve,
                image: ImageResponse.data.url
            }
        })
    }

    const handleRemoveCategorySelected = (categoryId) =>{
        const index = subCategoryData.category.findIndex(el => el._id === categoryId)
        subCategoryData.category.splice(index,1)
        setSubCategoryData((preve)=>{
            return{
                ...preve
            }
        })
    }

    const handleSubmitSubCategory = async(e) =>{
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.createSubCategory,
                data : subCategoryData
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                }
            }

        } catch (error) {
            AxiosToastError(error);
        }
    }

    return (
        <section className='fixed top-0 left-0 bottom-0 right-0 bg-neutral-800 bg-opacity-70 flex justify-center items-center p-4 z-50'>
            <div className='bg-white w-full max-w-5xl p-4 rounded'>
                <div className='flex items-center justify-between gap-3'>
                    <h1 className='font-semibold'>Add Sub Category</h1>
                    <button className='ml-auto hover:text-red-600' onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='my-3 grid gap-3' onSubmit={handleSubmitSubCategory}>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            name='name'
                            value={subCategoryData.name}
                            onChange={handleChange}
                            className='bg-blue-50 border outline-none p-3 focus-within:border-yellow-300 rounded'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className="flex flex-col gap-3 lg:flex-row items-center">
                            <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                                {
                                    !subCategoryData.image ? (
                                        <p className='text-sm text-neutral-400 '>No Image</p>
                                    ) : (
                                        <img src={subCategoryData.image} alt='subCategory'
                                            className='w-full h-full object-scale-down'
                                        />
                                    )
                                }
                            </div>
                            <label htmlFor="uploadSubCategoryImage">
                                <div className='border px-4 py-1 text-yellow-500 border-yellow-300 rounded hover:bg-yellow-400 hover:text-neutral-900 cursor-pointer'>
                                    UploadImage
                                </div>
                                <input
                                    hidden
                                    id='uploadSubCategoryImage'
                                    type='file'
                                    onChange={handleUploadSubCategoryImage}
                                />
                            </label>

                        </div>
                    </div>

                    {/* <div className='grid gap-1'>
                        <label htmlFor="">Select Category</label>
                        <select
                            className='bg-blue-50 border p-3'
                            name=""
                            id="">
                            <option value={""}>Select Category</option>
                        </select>
                    </div> */}

                    <div className='grid gap-1'>
                        <label>Select Category</label>
                        <div className='border focus-within:border-yellow-400 rounded outline-none'>
                            {/* display value */}
                            <div className='flex flex-wrap gap-2'>
                                {
                                    subCategoryData.category.map((cat, index) => {
                                    return (
                                        <p
                                        className='bg-white shadow-md px-1 m-1 flex items-center gap-2'
                                        key={cat._id + "selectedValue"}>{cat.name}
                                        <div
                                        onClick={()=> handleRemoveCategorySelected(cat._id)}
                                        className='cursor-pointer hover:text-red-600'><IoClose size={20}/></div></p>
                                        )
                                    })
                                }
                            </div>

                            {/* select category */}
                            <select className='w-full p-2 bg-transparent outline-none border'
                                onChange={(e) => {
                                    const value = e.target.value
                                    const categoryDetails = allCategory.find(el => el._id == value)
                                    setSubCategoryData((preve) => {
                                        return {
                                            ...preve,
                                            category: [...preve.category, categoryDetails]
                                        }
                                    })
                                }} >
                                <option value={""} >Select Category</option>
                                {
                                    allCategory.map((category, index) => {
                                        return (
                                            <option value={category?._id} key={category._id + "subCategory"}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    
                    <button
                     className={`px-4 py-1 border
                        ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-200"}
                        font-semibold
                     `}>Submit</button>
                </form>
            </div>
        </section>
    )
}

export default UploadSubCategoryModel