import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { server } from '../main';
import Layout from './Layout';
import toast from 'react-hot-toast';

const AdminUsers = ({user}) => {
    const navigate=useNavigate();

    if(user && user.mainrole!=="superadmin"){
        navigate("/");
    }

    const [users,setUsers]=useState([]);

    async function fetechUsers(){
        try {
            const {data}=await axios.get(`${server}/api/users`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setUsers(data.users);
        } catch (error) {
            console.log(error)
        }
    }

    const updateRole=async(Id)=>{
        if(confirm("Are you sure you want to update this user's role?")){
            try {
                const {data}=await axios.put(`${server}/api/user/${Id}`, {}, {
                    headers:{
                        token:localStorage.getItem("token")
                    }
                })
                toast.success(data.message)
                fetechUsers()
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong")
            }
        }
    }

    useEffect(()=>{
        fetechUsers();
    },[])
    console.log(users)
  return (
    <Layout>
        <div className="w-[800px] overflow-x-auto whitespace-nowrap mt-[20px] mx-auto min-h-[80vh] ml-2">
            <h1 className="text-center text-2xl font-semibold my-4">All Users</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="border border-gray-300 p-3 font-semibold text-gray-700">#</th>
                        <th className="border border-gray-300 p-3 font-semibold text-gray-700">Name</th>
                        <th className="border border-gray-300 p-3 font-semibold text-gray-700">Email</th>
                        <th className="border border-gray-300 p-3 font-semibold text-gray-700">Role</th>
                        <th className="border border-gray-300 p-3 font-semibold text-gray-700">Update Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index)=>(
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="border border-gray-300 p-3 text-gray-600">{index+1}</td>
                            <td className="border border-gray-300 p-3 text-gray-600">{user.name}</td>
                            <td className="border border-gray-300 p-3 text-gray-600">{user.email}</td>
                            <td className="border border-gray-300 p-3 text-gray-600 capitalize">{user.role}</td>
                            <td className="border border-gray-300 p-3 text-center">
                                <button onClick={() => updateRole(user._id)} className="px-[20px] py-[10px] bg-[#8a4baf] text-white rounded-md hover:bg-[#7a3b9f] transition-all duration-300">
                                    Update Role
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Layout>
  )
}

export default AdminUsers