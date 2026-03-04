import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout'
import axios from 'axios'
import { server } from '../main'

const AdminDashboard = ({user}) => {
    const navigate=useNavigate()

    if(user && user.role!=="admin"){
        navigate("/")
    }

    const [stats,setStats]=useState([]);

    async function fetchstats(){
        try {
            const {data}=await axios.get(`${server}/api/stats`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setStats(data.stats)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchstats()
    },[])

  return (
    <div>
        <Layout>
            <div className="flex justify-center items-center flex-wrap gap-[20px] ml-[40px]">
                <div className="bg-[#8a4baf] py-[15px] px-[5px] rounded-[5px] text-center mt-[5px] text-white hover:bg-[#432456] transition-all duration-300 w-auto min-w-[150px]">
                    <p>Total Courses</p>
                    <p>{stats.totalCourses}</p>
                </div>
                <div className="bg-[#8a4baf] py-[15px] px-[5px] rounded-[5px] text-center mt-[5px] text-white hover:bg-[#432456] transition-all duration-300 w-auto min-w-[150px]">
                    <p>Total Lectures</p>
                    <p>{stats.totalLectures}</p>
                </div>
                <div className="bg-[#8a4baf] py-[15px] px-[5px] rounded-[5px] text-center mt-[5px] text-white hover:bg-[#432456] transition-all duration-300 w-auto min-w-[150px]">
                    <p>Total Students</p>
                    <p>{stats.totalUsers}</p>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default AdminDashboard