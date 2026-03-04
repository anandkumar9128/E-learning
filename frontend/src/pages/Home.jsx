import React from 'react'
import { useNavigate } from 'react-router-dom'
import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer'

const Home = () => {
  const navigate=useNavigate()
  return (
    <div>
      <div className='bg-[#f5f5f5] py-[50px] sm:py-[100px] text-center px-[20px] sm:px-0'>
        <div className="max-w-[800px] mx-auto">
          <h1 className='text-[28px] sm:text-[36px] mb-[20px] font-semibold text-[#333]'>Welcome to our E-learning platform</h1>
          <p className='text-[16px] sm:text-[18px] mb-[40px] text-[#666]'>Learn anything, anywhere, anytime</p>
          <button onClick={()=>navigate('/login')} className='bg-[#8a4baf] px-[20px] py-[10px] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300'>Get Started</button>
        </div>
      </div>
      <Testimonial/>
    </div>
  )
}

export default Home