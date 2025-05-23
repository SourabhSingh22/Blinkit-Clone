import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import React from "react";
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';

function App() {

  const dispatch = useDispatch()

  const fetchUser = async ()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategory
      })

      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
      }


    } catch (error) {

    } finally {
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategroy = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })

      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data))
      }


    } catch (error) {

    } finally {

    }
  }

  useEffect(()=>{
    fetchUser()
    fetchCategory();
    fetchSubCategroy();
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
