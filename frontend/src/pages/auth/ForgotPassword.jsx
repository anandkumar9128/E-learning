import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { server } from '../../main';

const ForgotPassword = () => {
    const [email,setEmail]=useState("");
    const [btnLoading,setBtnLoading]=useState(false);
    const navigate=useNavigate()

    const submitHandler=async(e)=>{
        e.preventDefault()
        try {
            setBtnLoading(true)
            const {data}=await axios.post(`${server}/api/user/forgot`,{email})
            toast.success(data.message)
            navigate("/login")
            setBtnLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false)
        }
    }
  return (
    <div className="flex items-center justify-center h-[80vh] bg-white">
        <div className="bg-white p-[20px] border border-[#ddd] shadow-md rounded-[10px] text-center w-[300px]">
            <h2 className='text-[24px] text-[#8a4baf] mb-[15px] font-semibold'>Forgot Password</h2>
            <form onSubmit={submitHandler} className='text-left'>
                <label htmlFor="email" className='block mb-[5px] text-[14px] text-[#333]'>Email<span className='text-red-500'> *</span></label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className='w-full p-[10px] border border-[#ddd] rounded-[4px] mb-[15px]'/>
                <button disabled={btnLoading} className='w-full px-[20px] py-[10px] bg-[#8a4baf] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300' type="submit">{btnLoading ? "Please Wait..." : "Send Reset Link"}</button>
            </form>
            <p className='mt-[15px] text-[14px] text-[#333]'>
                <Link to="/login" className='text-[#8a4baf] hover:underline'>Back to login</Link>
            </p>
        </div>
    </div>
  )
}

export default ForgotPassword