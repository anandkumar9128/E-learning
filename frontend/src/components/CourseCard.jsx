import React from 'react'
import { server } from '../main'
import { UserData } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { CourseData } from '../context/CourseContext'
const Coursecard = ({course}) => {
  const navigate=useNavigate()
  const {user,isAuth}=UserData()

  const {fetchCourses}=CourseData();

  const deleteHandler=async(id)=>{
    if(confirm("Are you sure you  want to delete this course?")){
      try {
        const {data}=await axios.delete(`${server}/api/course/${id}`,{
          headers:{
            token:localStorage.getItem("token")
          }
        })
        toast.success(data.message)
        fetchCourses()
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  }
  return (
    <div className="bg-white shadow-md p-[20px] rounded-[10px] text-center w-[250px] transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        <img src={`${server}/${course.image }`} alt="" className='w-full h-[150px] object-cover rounded-[10px] mb-[10px]' />
        <h3 className='text-[18px] text-[#333] mb-[10px] font-semibold'>{course.title}</h3>
        <p className='text-[14px] text-[#806868] mb-[5px]'>{course.description}</p>
        <p className='text-[14px] text-[#806868] mb-[5px]'>Instructor- {course.createdBy}</p>
        <p className='text-[14px] text-[#806868] mb-[5px]'>Duration- {course.duration} weeks</p>
        <p className='text-[14px] text-[#806868] mb-[5px]'>Price- ₹{course.price}</p>
        {
          isAuth?(
            <>
            {user && user.role!=="admin"?(
              <>
                {
                  user.subscription.includes(course._id)?
                  <button  onClick={()=>navigate(`/course/study/${course._id}`)} className='bg-[#8a4baf] text-[14px] text-white px-[20px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300'>Study</button>
                  :
                  <button  onClick={()=>navigate(`/course/${course._id}`)} className='bg-[#8a4baf] text-[14px] text-white px-[20px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300'>Get Started</button>
                }
              </>
            ):(
            <button  onClick={()=>navigate(`/course/study/${course._id}`)} className='bg-[#8a4baf] text-[14px] text-white px-[20px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300'>Study</button>)}
            </>
          ):(
            <button  onClick={()=>navigate(`/login`)} className='bg-[#8a4baf] text-[14px] text-white px-[20px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300'>Get Started</button>
          )
        }

        {
          user && user.role==="admin" && (
            <button onClick={()=>deleteHandler(course._id)} className='bg-[#f72f2f] ml-[20px] text-[14px] text-white px-[20px] py-[10px] rounded-[4px] cursor-pointer hover:bg-[#d00000] transition-all duration-300'>Delete</button>
          )
        }
    </div>
  )
}

export default Coursecard