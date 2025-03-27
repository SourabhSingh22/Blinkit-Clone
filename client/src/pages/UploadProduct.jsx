import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import uploadImage from '../utils/UploadImage'
import Loading from '../components/Loading'
import ViewImage from '../components/ViewImage'
import { MdDelete } from "react-icons/md"
import { useSelector } from 'react-redux'
import { IoClose } from 'react-icons/io5'
import AddField from '../components/AddField'

const UploadProduct = () => {

  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  })

  const [imageLoading, setImageLoading] = useState(false)
  const [viewImageUrl, setViewImageUrl] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState()
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")

  const handleChange = (e) => {


    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadImage = async (e) => {

    const file = e.target.files[0]

    if (!file) {
      return;
    }

    setImageLoading(true)

    const response = await uploadImage(file)

    const { data: ImageResponse } = response
    const imageUrl = ImageResponse.data.url

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    })
    setImageLoading(false)
  }

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,

      }
    })
  }

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      }
    })
  }

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
  }


  return (
    <section className=''>
      <div className='bg-white shadow-md p-2 flex items-center justify-between'>
        <h2 className='font-semibold'>Upload Product</h2>
      </div>
      <div className='grid p-3'>
        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor="name">Name</label>
            <input
              className='bg-blue-50 outline-none  border focus-within:border-yellow-400 p-2 rounded'
              id='name'
              type="text"
              name="name"
              placeholder='Enter product name'
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="description">Description</label>
            <textarea
              className='bg-blue-50 outline-none  border focus-within:border-yellow-400 p-2 rounded resize-none'
              id='description'
              type="text"
              name="description"
              placeholder='Enter product description'
              value={data.description}
              onChange={handleChange}
              required
              multiple
              rows={3}
            />
          </div>

          <div>
            <p className='font-medium'>Image</p>
            <div>
              <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex items-center justify-center cursor-pointer'>
                <div className='text-center flex items-center justify-center flex-col'>
                  {
                    imageLoading ? <Loading /> : (
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p>Upload Image</p>
                      </>
                    )
                  }

                </div>
                <input
                  type="file"
                  id='productImage'
                  hidden
                  onChange={handleUploadImage}
                  accept='image/*'
                />

              </label>
              {/* display upload image */}
              <div className='flex flex-wrap gap-4'>
                {
                  data.image.map((img, index) => {
                    return (
                      <div key={img + index} className='h-20 w-20 min-w-20 border relative group shadow-sm mt-1'>
                        <img
                          src={img}
                          alt={img}
                          className='p-1 mt-1 w-full h-full object-scale-down cursor-pointer'
                          onClick={() => setViewImageUrl(img)}
                        />
                        <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-500
                            text-white 
                            hover:bg-red-600 rounded cursor-pointer hidden group-hover:block'>
                          <MdDelete />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="">Category</label>
            <div>
              <select
                className='bg-blue-50 border w-full p-2
              rounded cursor-pointer'
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el._id === value)

                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category]
                    }
                  })
                  setSelectCategory("")
                }}
                name="" id="">
                <option value={""}>Select Category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.category.map((c, index) => {
                    return (
                      <div className='flex gap-1 items-center text-sm bg-blue-50 shadow-sm mt-2' key={c._id + index + "productsection"}>
                        <p>{c.name}</p>
                        <div className=' cursor-pointer hover:text-red-600' onClick={() => handleRemoveCategory(index)}>
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="">Sub Category</label>
            <div>
              <select
                className='bg-blue-50 border w-full p-2
              rounded cursor-pointer'
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const subCategory = allSubCategory.find(el => el._id === value)

                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory]
                    }
                  })
                  setSelectSubCategory("")
                }}
                name="" id="">
                <option value={""} className='text-neutral-600'>Select Sub Category</option>
                {
                  allSubCategory.map((c, index) => {
                    return (
                      <option value={c?._id+index+"productsection"}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.subCategory.map((c, index) => {
                    return (
                      <div className='flex gap-1 items-center text-sm bg-blue-50 shadow-sm mt-2' key={c._id + index + "subCategorySection"}>
                        <p>{c.name}</p>
                        <div className=' cursor-pointer hover:text-red-600' onClick={() => handleRemoveSubCategory(index)}>
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="unit">Unit</label>
            <input
              id='unit'
              type="text"
              name='unit'
              value={data.unit}
              placeholder='Enter product unit'
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-yellow-400 rounded'
              required
            />
          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="stock">Number of Stock</label>
            <input
              id='stock'
              type="number"
              name='stock'
              value={data.stock}
              placeholder='Enter product stock'
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-yellow-400 rounded'
              required
            />
          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="price">Price</label>
            <input
              id='price'
              type="number"
              name='price'
              value={data.price}
              placeholder='Enter product price'
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-yellow-400 rounded'
              required
            />
          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="discount">Discount</label>
            <input
              id='discount'
              type="number"
              name='discount'
              value={data.discount}
              placeholder='Enter product discount'
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-yellow-400 rounded'
              required
            />
          </div>

          {/* add more fields */}

            {
              Object?.keys(data?.more_details)?.map((k, index) => {
                return (
                  <div className='grid gap-1'>
                    <label className='font-medium' htmlFor={k}>{k}</label>
                    <input
                      id={k}
                      type="text"
                      value={data?.more_details[k]}
                      onChange={(e)=>{
                        const value = e.target.value
                        setData((preve)=>{
                          return{
                            ...preve,
                            more_details : {
                              ...preve.more_details,
                              [k] : value
                            }
                          }
                        })
                      }}
                      className='bg-blue-50 p-2 outline-none border focus-within:border-yellow-400 rounded'
                      required
                    />
                  </div>
                )
              })
            }

          <div onClick={() => setOpenAddField(true)} className='border hover:bg-yellow-400 bg-white cursor-pointer py-1 px-3 w-32 text-center font-semibold shadow-sm rounded border-yellow-500 hover:text-neutral-900'>
            Add Field
          </div>

            <button className='border bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-semibold'>Submit</button>

        </form>
      </div>

      {
        viewImageUrl && (
          <ViewImage url={viewImageUrl} close={() => setViewImageUrl("")} />
        )
      }

      {
        openAddField && (
          <AddField
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}

            close={() => setOpenAddField(false)} />
        )
      }

    </section>
  )
}

export default UploadProduct