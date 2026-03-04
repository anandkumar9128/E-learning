import React from 'react'
import { CourseData } from '../../context/CourseContext'
import CourseCard from '../../components/CourseCard'

const Courses = () => {
    const {courses}=CourseData()
    return (
        <div className="text-[32px] text-center mt-[20px] mb-[20px] text-[#8a4baf]">
            <h2 className='mb-[20px] font-semibold'>Avialable Courses</h2>

            <div className="flex flex-wrap justify-center gap-[20px]">
                {
                    courses && courses.length > 0 ? (
                        courses.map((course)=>(
                            <CourseCard course={course} key={course._id}/>
                        ))
                    ) : (
                        <p>No Courses Available</p>
                    )
                }
            </div>
        </div>
    )
}

export default Courses;