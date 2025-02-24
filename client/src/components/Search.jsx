import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';



const Search = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [isMobile] = useMobile();

    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch);
    }, [location])


    const redirectToSearch = () => {
        navigate("/search");
    }

    return (
        <div className='w-full min-w-[380px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-blue-300'>

            <div>
                {
                    (isMobile && isSearchPage) ? (
                        <Link to={'/'} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-blue-300 bg-white rounded-full shadow-md'>
                            <FaArrowLeft size={20} />
                        </Link>
                    ) : (
                        <button className='flex justify-center items-center h-full p-3 group-focus-within:text-blue-300'>
                            <IoSearch size={22} />
                        </button>
                    )
                }
            </div>

            <div className='w-full h-full'>
                {
                    !isSearchPage ? (
                        // not in search page
                        <div className='w-full h-full flex items-center' onClick={redirectToSearch}>
                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search "milk"',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Search "bread"',
                                    1000,
                                    'Search "bread"',
                                    1000,
                                    'Search "paneer"',
                                    1000,
                                    'Search "sugar"',
                                    1000,
                                    'Search "chocolate"',
                                    1000,
                                    'Search "rice"',
                                    1000,
                                    'Search "chips"'
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                    ) : (
                        // when i was search page
                        <div className='w-full h-full'>
                            <input
                                type="text"
                                placeholder='Search for atta dal and more'
                                autoFocus
                                className='bg-transparent w-full h-full outline-none
                                text-1xl'
                            />
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Search