import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../context/CourseContext'
import { server } from '../main'

const CourseStudy = ({user}) => {
    const params=useParams()
    const navigate=useNavigate();

    const {fetchCourse,course}=CourseData()

    if(user && user.role!=="admin" && !user.subscription.includes(params.id)){
        navigate("/")
    }

    useEffect(()=>{
        fetchCourse(params.id)
    },[])
  return (
    <>
    {course && <div className='flex items-center flex-col bg-[#f5f5f5] min-h-[80vh] p-[50px]'>
        <img src={`${server}/${course.image}`} alt="" width={350} />
        <h2 className='text-[24px] font-semibold text-[#8a4baf] text-center'>{course.title}</h2>
        <h4 className='text-[16px] text-[#333] text-center'>{course.description}</h4>
        <h5 className='text-[14px] text-[#333] text-center'>by-{course.createdBy}</h5>
        <h5 className='text-[14px] text-[#333] text-center'>Duration-{course.duration} weeks</h5>
        <Link to={`/lectures/${course._id}`} className='bg-[#8a4baf] mt-[20px] px-[20px] py-[10px] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300'>Lectures</Link>
    </div>}
    </>
  )
}

export default CourseStudy