import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';


const Profile = () => {
    const user = useSelector(state => state.user)

    const [openProfileAvatarEdit, setopenProfileAvatarEdit] = useState(false)

  return (
    <div>
        <div className='h-20 w-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
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
        <button onClick={()=> setopenProfileAvatarEdit(true)} className='text-sm min-w-20 border border-blue-500 hover:bg-blue-100 cursor-pointer px-3 py-1 rounded-full mt-3'>Edit</button>

        {
            openProfileAvatarEdit && (
                <UserProfileAvatarEdit close={()=> setopenProfileAvatarEdit(false) }/>
            )
        }

    </div>
  )
}

export default Profile