import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError'
import { updateAvatar } from '../store/userSlice';
import { IoClose } from "react-icons/io5";


const UserProfileAvatarEdit = ({close}) => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];

    if(!file){
      return;
    }

    const formData = new FormData()
    formData.append('avatar', file);

    
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData
      })

      const {data : responseData} = response
      dispatch(updateAvatar(responseData.data.avatar))
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }

  }


  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 opacity-90 p-4 flex items-center justify-center'>
      <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>

        <button onClick={close} className='text-neutral-800 w-fit block ml-auto cursor-pointer'>
          <IoClose size={20}/>
        </button>

        <div className='h-20 w-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
          {
            user.avatar ? (
              <img
                className='w-full h-full'
                src={user.avatar}
                alt={user.name} />
            ) : (
              <FaRegUserCircle size={65} />
            )
          }
        </div>

        <form onSubmit={() => e.preventDefault()}>
          <label htmlFor="uploadProfile">
            <div className='border border-gray-500 hover:bg-gray-700 rounded px-4 py-1 text-sm
        my-3 hover:text-amber-50 cursor-pointer'>
              {
                loading ? "Loading..." : "Upload"
              }
            </div>
            <input onChange={handleUploadAvatarImage} type="file" id='uploadProfile' className='hidden' />
          </label>
        </form>

      </div>
    </section>
  )
}

export default UserProfileAvatarEdit