import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";


const Profile = () => {
    const user = useSelector(state => state.user)

    console.log('profile',user);

    
  return (
    <div>
        <div className='h-20 w-20 bg-red-400 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
            {
                user.avatar ? (
                    <img
                    className='w-full h-full'
                    src={user.avatar} 
                    alt={user.name} />
                ) : (
                    <FaRegUserCircle size={65}/>
                )
            }
        </div>
        <button className='text-sm min-w-20 border border-blue-500 hover:bg-blue-100 cursor-pointer px-3 py-1 rounded-full mt-3'>Edit</button>
    </div>
  )
}

export default Profile