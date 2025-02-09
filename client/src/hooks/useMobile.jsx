import React, {useEffect, useState} from "react"

const useMobile = (breakpoint = 786) => {
    const [isMobile, setIsMoblie] = useState(window.innerWidth < breakpoint)

    const handleResize = () =>{
        const checkpoint = window.innerWidth < breakpoint
        setIsMoblie(checkpoint)
    }

    useEffect(()=>{
        handleResize()

        window.addEventListener('resize',handleResize)

        return () =>{
            window.removeEventListener('resize',handleResize)
        }
    },[])

    return [isMobile]
}

export default useMobile