import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {

  const dispatch = useDispatch()

  const fetchUser = async ()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <>
      <Header/>
      <main className='min-h-[76vh]'>
        <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
    </>
    
  )
}

export default App
