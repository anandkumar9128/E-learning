import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserData } from '../../context/UserContext'
import { CourseData } from '../../context/CourseContext'
const Login = () => {

  const {btnLoading,loginUser}=UserData()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()

  const {fetchMyCourse}=CourseData();

  const submitHandler=async(e)=>{
    e.preventDefault()
    await loginUser(email,password,navigate,fetchMyCourse)
  }
  return (
    <div className="flex items-center justify-center h-[80vh] bg-white">
        <div className="bg-white p-[20px] border border-[#ddd] shadow-md rounded-[10px] text-center w-[300px]">
            <h2 className='text-[24px] text-[#8a4baf] mb-[15px] font-semibold'>Login</h2>
            <form onSubmit={submitHandler} action="" className='text-left'>
                <label htmlFor="email" className='block mb-[5px] text-[14px] text-[#333] '>Email<span className='text-red-500'> *</span></label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className='w-full p-[10px] border border-[#ddd] rounded-[4px] mb-[15px]'/>

                <label htmlFor="password" className='block mb-[5px] text-[14px] text-[#333] '>Password<span className='text-red-500'> *</span></label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className='w-full p-[10px] border border-[#ddd] rounded-[4px] mb-[15px]'/>

                <button disabled={btnLoading} type="submit" className='w-full px-[20px] py-[10px] bg-[#8a4baf] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300'>{btnLoading ? "Please Wait..." : "Login"}</button>
            </form>
            <p className='mt-[15px] text-[14px] text-[#333]'>
                Don't have an account? <Link to="/register" className='text-[#8a4baf] hover:underline'>Register</Link>
            </p>
            <p className='mt-[5px] text-[14px] text-[#333]'><Link to="/forgot" className='text-[#8a4baf] hover:underline'>Forgot Password?</Link></p>
        </div>
    </div>
  ) 
}

export default Login