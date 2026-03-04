import React from 'react'
import { CourseData } from '../context/CourseContext'
import Coursecard from '../components/CourseCard'

const Dashboard = () => {
    const {myCourse}=CourseData()
  return (
    <div className='p-[80px] text-center min-h-55vh]'>
        <h2 className='text-[32px] font-semibold text-[#8a4baf] mb-[20px]'>All Enrolled Courses</h2>
        <div className="flex justify-around flex-wrap gap-[20px] mt-[40px]">
            {
                myCourse && myCourse.length > 0 ? (
                    myCourse.map((e)=>(
                        <Coursecard key={e._id} course={e}/>
                    ))
                ) : (
                    <p>No Courses Enrolled Yet</p>
                )
            }
        </div>
    </div>
  )
}

export default Dashboard