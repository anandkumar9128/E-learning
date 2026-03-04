import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserData } from '../../context/UserContext';
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp,setOtp]=useState("");
  const {verifyOtp,btnLoading}=UserData()
  const navigate=useNavigate()

  const [show,setShow]=useState(false)

  function onChange(value) {
    console.log("Captcha value:", value);
    setShow(true)
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    await verifyOtp(Number(otp),navigate);
  }
  return (
    <div className='flex items-center justify-center h-[80vh] bg-white'>
        <div className="bg-white p-[20px] border border-[#ddd] shadow-md rounded-[10px] text-center w-[350px]">
            <h2 className='text-[24px] text-[#8a4baf] mb-[15px] font-semibold'>Verify Account</h2>
            <form onSubmit={submitHandler} className='text-left'>
                <label htmlFor="otp" className='block mb-[5px] text-[14px] text-[#333] '>OTP<span className='text-red-500'> *</span></label>
                <input type="number" value={otp} onChange={(e)=>setOtp(e.target.value)} required className='w-full p-[10px] border border-[#ddd] rounded-[4px] mb-[15px]'/>
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onChange}
                />,

                {show &&<button type="submit" disabled={btnLoading} className='w-full px-[20px] py-[10px] bg-[#8a4baf] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300'>{btnLoading?"Please Wait...":"Verify"}</button>}
            </form>
            <p className='mt-[15px] text-[14px] text-[#333]'>
                Go to <Link to="/login" className='text-[#8a4baf] hover:underline'>Login</Link> page
            </p>
        </div>
    </div>
  )
}

export default Verify