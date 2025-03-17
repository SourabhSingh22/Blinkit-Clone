import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin';

const AdminPermission = ({children}) => {

  const user = useSelector(state => state.user);

  return (
    <>
      {
        isAdmin(user.role) ? children : <p className='bg-red-200 text-red-500 text-center p-3'>Do not have permission</p>
      }
    </>
  )
}

export default AdminPermission