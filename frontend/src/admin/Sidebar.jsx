import React from 'react'
import { Link } from 'react-router-dom'
import {AiFillHome, AiOutlineLogout} from 'react-icons/ai'
import {FaBook} from 'react-icons/fa'
import {FaUserAlt} from 'react-icons/fa'
import { UserData } from '../context/UserContext'

const SideBar = () => {
    const {user}=UserData();
  return (
    <div className="w-[50%] md:w-[200px] max-md:w-[30px] h-full left-0 text-[#8a4baf] border-r border-gray-500">
        <ul className="list-none p-0">
            <li className="mb-[10px] cursor-pointer p-[12px] max-md:p-[7px] hover:bg-gray-500 hover:text-white">
                <Link to={'/admin/dashboard'} className="flex no-underline [counter-reset:blueviolet]">
                    <div className="icon">
                        <AiFillHome/>
                    </div>
                    <span className="ml-[15px] hidden md:block">Home</span>
                </Link>
            </li>
            <li className="mb-[10px] cursor-pointer p-[12px] max-md:p-[7px] hover:bg-gray-500 hover:text-white">
                <Link to={'/admin/course'} className="flex no-underline [counter-reset:blueviolet]">
                    <div className="icon">
                        <FaBook/>
                    </div>
                    <span className="ml-[15px] hidden md:block">Courses</span>
                </Link>
            </li>
            {
                user.mainrole==="superadmin" && (
                    <li className="mb-[10px] cursor-pointer p-[12px] max-md:p-[7px] hover:bg-gray-500 hover:text-white">
                        <Link to={'/admin/users'} className="flex no-underline [counter-reset:blueviolet]">
                            <div className="icon">
                                <FaUserAlt/>
                            </div>
                            <span className="ml-[15px] hidden md:block">Users</span>
                        </Link>
                    </li>
                )
            }
            <li className="mb-[10px] cursor-pointer p-[12px] max-md:p-[7px] hover:bg-gray-500 hover:text-white">
                <Link to={'/account'} className="flex no-underline [counter-reset:blueviolet]">
                    <div className="icon">
                        <AiOutlineLogout/>
                    </div>
                    <span className="ml-[15px] hidden md:block">Logout</span>
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default SideBar