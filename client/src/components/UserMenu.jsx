import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { FiExternalLink } from "react-icons/fi";


const UserMenu = ({close}) => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = async() =>{
        try {
          const response = await Axios({
            ...SummaryApi.logout
          })

          if(response.data.success){
            if(close){
              close();
            }
            dispatch(logout());
            localStorage.clear()
            toast.success(response.data.message)
            navigate('/')
          }
        } catch (error) {
          AxiosToastError(error)
        }
    }

  return (
    <div>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm flex items-center gap-2'>
          <span className='max-w-52 text-ellipsis line-clamp-1'>
            {user.name || user.mobile}
          </span>
        <Link to={'/dashboard/profile'} className='hover:text-blue-500'>
        <FiExternalLink size={15}/>
        </Link>
        </div>

        <Divider/>

        <div className='text-sm grid gap-1'>
            <Link to={""} className='px-2 hover:bg-blue-300 py-1'>My Oders</Link>
            <Link to={""} className='px-2 hover:bg-blue-300 py-1'>Save Address</Link>
            <button onClick={handleLogout} className='text-left px-2 hover:bg-red-700 hover:text-white py-1 rounded'>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu