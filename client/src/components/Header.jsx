import { useSelector } from 'react-redux'
// import logo from '../assets/logo.png'
import Search from './Search'
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { useState } from 'react';
import UserMenu from './UserMenu';
import logo from '../assets/logo.png'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';


const Header = () => {
    const [isMobile] = useMobile()
    const location = useLocation();
    const isSearchPage = location.pathname === '/search'
    const navigate = useNavigate();

    const user = useSelector((state) => state?.user)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const cartItem = useSelector((state) => state?.cartItem.cart)
    // const [totalPrice, setTotalPrice] = useState(0);
    // const [totalQty, setTotalQty] = useState(0);

    const { totalPrice, totalQty } = useGlobalContext()
    const [openCartSection, setOpenCartSection] = useState(false);


    const redirectToLoginPage = () => {
        navigate('/login');
    }

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false)
    }

    const handleMobileUser = () => {
        if (!user._id) {
            navigate('login')
            return;
        }

        navigate('/user');
    }

    // total items and total price
    // useEffect(() => {
    //     const qty = cartItem.reduce((preve, curr)=>{
    //         return preve + curr.quantity;
    //     }, 0)
    //     setTotalQty(qty);
    //     // setTotalPrice()
    //     const price = cartItem.reduce((prev, curr) => {
    //         return prev + (curr?.productId.price * curr?.quantity);
    //     }, 0)
    //     setTotalPrice(price);
    // }, [cartItem]);


    return (
        <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex justify-center flex-col gap-1 bg-white px-10'>
            {
                !(isSearchPage && isMobile) && (
                    <div className='container flex mx-auto items-center justify-between'>
                        {/* logo */}
                        <div className='h-full'>
                            <Link to={"/"} className='h-full flex justify-center items-center'>
                                <div className='hidden lg:block'>
                                    <p className='text-blue-500 text-4xl font-bold'>Pic<span className='text-neutral-600'>kuick</span></p>
                                </div>

                                <div className='lg:hidden'>
                                    <p className='text-blue-500 text-4xl font-bold'>Pic<span className='text-neutral-600'>kuick</span></p>
                                </div>

                            </Link>
                        </div>
                        {/* Search */}
                        <div className='hidden lg:block'>
                            <Search />
                        </div>

                        {/* login and my cart */}
                        <div>
                            {/* user icons display is only mobile version */}
                            <button className='text-neutral-600 lg:hidden cursor-pointer' onClick={handleMobileUser}>
                                <FaRegCircleUser size={26} />
                            </button>

                            {/* This part for the desktop */}
                            <div className='hidden lg:flex items-center gap-10'>

                                <div className='shadow-md rounded-full px-2 py-2 hover:bg-blue-50'>
                                    {
                                        user?._id ? (
                                            <div className='relative'>
                                                <div onClick={() => setOpenUserMenu((prev) => !prev)} className='flex items-center gap-1 cursor-pointer'>
                                                    <p>Account</p>
                                                    {
                                                        openUserMenu ? (
                                                            <FaAngleUp size={21} />
                                                        ) : (
                                                            <FaAngleDown size={21} />
                                                        )
                                                    }
                                                </div>
                                                {
                                                    openUserMenu && (
                                                        <div className='absolute right-0 top-12'>
                                                            <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                                <UserMenu close={handleCloseUserMenu} />
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        ) : (
                                            <button className='text-lg px-2 cursor-pointer' onClick={redirectToLoginPage}>Login</button>
                                        )
                                    }
                                </div>




                                <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-2 bg-blue-800 hover:bg-blue-700 px-3 py-2 rounded text-white'>
                                    {/* add to card icons */}
                                    <div className='animate-bounce '>
                                        <BsCart4 size={26} />
                                    </div>
                                    <div className='font-semibold text-sm'>
                                        {
                                            cartItem[0] ? (
                                                <div><p>{totalQty} Items</p>
                                                    <p>{DisplayPriceInRupees(totalPrice)}</p></div>
                                            ) : (

                                                <p>My Cart</p>
                                            )
                                        }
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className='container m-auto px-5 lg:hidden'>
                <Search />
            </div>

            {
                openCartSection && (
                    <DisplayCartItem close={() => setOpenCartSection(false)} />
                )
            }
        </header>
    )
}

export default Header