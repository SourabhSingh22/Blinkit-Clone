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
import isAdmin from '../utils/isAdmin'


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
            <span className='font-medium text-red-600'>{user.role === "ADMIN" ? " (Admin)" : ""}</span>
          </span>
        <Link onClick={close} to={'/dashboard/profile'} className='hover:text-blue-500'>
        <FiExternalLink size={15}/>
        </Link>
        </div>

        <Divider/>

        <div className='text-sm grid gap-1'>

          {
            isAdmin(user.role) && (
              <Link onClick={close} to={"/dashboard/category"} className='px-2 hover:bg-blue-300 hover:text-black py-1'>Category</Link>
            )
          }

          {
            isAdmin(user.role) && (
              <Link onClick={close} to={'/dashboard/subcategory'} className='px-2 hover:bg-blue-300 hover:text-black py-1'>Sub Category</Link>
            )
          }

        {
            isAdmin(user.role) && (
               <Link onClick={close} to={"/dashboard/upload-product"} className='px-2 hover:bg-blue-300 hover:text-black py-1'>Upload Product</Link>
            )
          }

           
          {
            isAdmin(user.role) && (
              <Link onClick={close} to={"/dashboard/product"} className='px-2 hover:bg-blue-300 hover:text-black py-1'>Product</Link>
            )
          }
            

            <Link onClick={close} to={"/dashboard/myorders"} className='px-2 hover:bg-blue-300 hover:text-black py-1'>My Orders</Link>

            <Link onClick={close} to={"/dashboard/address"} className='px-2 hover:bg-blue-300 hover:text-black py-1'>Save Address</Link>

            <button onClick={handleLogout} className='text-left px-2 hover:bg-red-700 hover:text-white py-1 rounded'>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu