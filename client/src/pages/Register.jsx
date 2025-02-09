import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

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

        if (data.password !== data.confirmPassword) {
            toast.error(
                "password and confirm password must be same"
            )
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data : data
            })

            if(response.data.error){
                toast.error(response.data.message);
            }
            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate('/login')
            }

        } catch (error) {
            AxiosToastError(error)
        }

    }

    return (
        <section className='w-full container mx-auto px-10'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 shadow-2xl'>
                <p className='flex justify-center text-2xl text-amber-400'>Welcome to Blinkit</p>
                

                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="name">Name :</label>
                        <input
                            type="text"
                            id='name'
                            autoFocus
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-yellow-400'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            id='email'
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-yellow-400'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="password">Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-yellow-400'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full outline-none'
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
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="confirmPassword">Confirm Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-yellow-400'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                className='w-full outline-none'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your confirm password'
                            />
                            <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showConfirmPassword ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}>Register</button>
                </form>
                <p>
                    Already have account ? <Link to={'/login'} className='font-semibold text-blue-600 hover:text-blue-700'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default Register