import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import uploadImage from '../utils/UploadImage'

const UploadSubCategoryModel = ({ close }) => {

    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        image: "",
        category: []
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSubCategoryData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadSubCategoryImage = async(e) =>{
        const file = e.target.files[0]

        if(!file){
            return;
        }

        const response = await uploadImage(file)
        const {data : ImageResponse} = response

        setSubCategoryData((preve)=>{
            return{
                ...preve,
                image : ImageResponse.data.url
            }
        })
    }

    return (
        <section className='fixed top-0 left-0 bottom-0 right-0 bg-neutral-800 bg-opacity-70 flex justify-center items-center p-4 z-50'>
            <div className='bg-white w-full max-w-5xl p-4 rounded'>
                <div className='flex items-center justify-between gap-3'>
                    <h1 className='font-semibold'>Add Sub Category</h1>
                    <button className='ml-auto' onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='my-3 grid gap-3'>
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
                    <div className='grid gap-1'>
                        <label htmlFor="">Select Category</label>
                        <select
                        className='bg-blue-50 border p-3'
                         name=""
                         id="">
                            <option value={""}>Select Category</option>
                        </select>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default UploadSubCategoryModel