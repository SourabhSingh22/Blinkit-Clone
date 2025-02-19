import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <section className='bg-white px-8'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px_1fr]'>
            {/* left side menu */}
            <div className='py-4 sticky top-24 overflow-auto hidden lg:block'>
                <UserMenu/>
            </div>


            {/* right side content */}
            <div className='bg-white p-4'>
                <Outlet>
                    
                </Outlet>
            </div>
        </div>
    </section>
  )
}

export default Dashboard