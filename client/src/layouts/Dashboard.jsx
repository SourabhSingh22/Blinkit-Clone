import React, { useState } from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Dashboard = () => {

  const user = useSelector(state => state.user);

  
  return (
    <section className='bg-white px-8'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px_1fr]'>
            {/* left side menu */}
            <div className='py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-auto hidden lg:block border-r'>
                <UserMenu/>
            </div>


            {/* right side content */}
            <div className='bg-white min-h-[72vh]'>
                <Outlet/>
            </div>
        </div>
    </section>
  )
}

export default Dashboard