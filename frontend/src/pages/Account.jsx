import React from 'react'
import {MdDashboard} from 'react-icons/md'
import {IoMdLogOut} from 'react-icons/io'
import { UserData } from '../context/UserContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const Account = ({user}) => {
    const {setIsAuth,setuser}=UserData()
    const navigate=useNavigate()
    const logoutHandler=()=>{
        localStorage.clear()
        setIsAuth(false)
        setuser(null)
        toast.success("Logout successfully")
    }
  return (
    <div>
        {user &&(
            <div className='bg-white p-[20px] border border-[#ddd] shadow-md rounded-[10px] text-center w-[30%] my-[185px] mx-auto'>
            <h2 className='text-[32px] mb-[20px] font-semibold text-[#8a4baf]'>My Profile</h2>
            <div className="text-left text-[#333]">
                <p className='mb-[10px] text-[#333]'>
                    <strong className='text-[#8a4baf]'>Name - {user.name}</strong>
                </p>
                <p className='mb-[10px] text-[#333]'>
                    <strong className='text-[#8a4baf]'>Email - {user.email}</strong>
                </p>
                
                <button onClick={()=>navigate(`/${user._id}/dashboard`)} className='flex items-center gap-2 bg-[#8a4baf] text-white px-[20px] py-[10px] rounded-md hover:bg-[#7a3b9f] transition-all duration-300'><MdDashboard/>Dashboard</button>
                <br />
                {user && user.role==="admin" && <button onClick={()=>navigate(`/admin/dashboard`)} className='flex items-center gap-2 bg-[#8a4baf] text-white px-[20px] py-[10px] rounded-md hover:bg-[#7a3b9f] transition-all duration-300'><MdDashboard/>Admin Dashboard</button> }
                {user && user.role==="admin" && <br/>}
                <button onClick={logoutHandler} className='flex items-center gap-2 bg-[#f14f4f] text-white px-[20px] py-[10px] rounded-md hover:bg-[#bc0606] transition-all duration-300'><IoMdLogOut/>Logout</button>
                
            </div>
        </div>
        )   
        }
    </div>
  )
}

export default Account