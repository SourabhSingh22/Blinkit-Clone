import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';


const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target


        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(e1 => e1)

    const handleSubmit = async (e) => {
        e.preventDefault()


        try {
            const response = await Axios({
                ...SummaryApi.login,
                data : data
            })

            if(response.data.error){
                toast.error(response.data.message);
            }
            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem("accessToken", response.data.data.accessToken);
                localStorage.setItem("refreshToken", response.data.data.refreshToken);

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))

                setData({
                    email: "",
                    password: ""
                })
                navigate('/')
            }
        } catch (error) {
            AxiosToastError(error)
        }

    }

    return (
        <section className='w-full container mx-auto px-10'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 shadow-2xl '>

                <form className='grid gap-4 p-2' onSubmit={handleSubmit}>
                   
                    <div className='grid gap-1'>
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            id='email'
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-blue-400'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="password">Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-blue-400'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full outline-none bg-transparent'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showPassword ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                        <Link to={"/forgot-password"}
                        className='block ml-auto hover:text-amber-400'>Forgot password ?</Link>
                    </div>

                    <button disabled={!valideValue} className={`${valideValue ? "bg-blue-800 hover:bg-blue-700" : "bg-gray-500"}   text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}>Login</button>
                </form>
                <p>
                    Don't have account ? <Link to={'/register'} className='font-semibold text-blue-600 hover:text-blue-700'>Register</Link>
                </p>
            </div>
        </section>
    )
}

export default Login