import React from 'react'
import {Link, useNavigate} from 'react-router-dom'


const Header = ({isAuth}) => {
    const navigate=useNavigate()
  return (
    
    <header className='flex justify-between items-center p-[20px] bg-white shadow-md relative'>
        <div onClick={()=>navigate('/')}  className=" text-[25px] font-semibold text-[#8a4baf] cursor-pointer">
            E-learning
        </div>
        <div className='flex gap-2 md:gap-8 '>
            <Link className='text-[#333] transition-all duration-300 hover:text-[#8a4baf]' to="/">Home</Link>
            <Link className='text-[#333] transition-all duration-300 hover:text-[#8a4baf]' to="/about">About</Link>
            <Link className='text-[#333] transition-all duration-300 hover:text-[#8a4baf]' to="/courses">Courses</Link>
            {isAuth ? <Link className='text-[#333] transition-all duration-300 hover:text-[#8a4baf]' to="/account">Account</Link> : <Link className='text-[#333] transition-all duration-300 hover:text-[#8a4baf]' to="/login">Login</Link>}
        </div>
    </header>
  )
}

export default Header