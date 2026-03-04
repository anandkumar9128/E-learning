import React, { useState } from 'react'
import Layout from './Layout'
import { useNavigate } from 'react-router-dom'
import { CourseData } from '../context/CourseContext'
import Coursecard from '../components/CourseCard'
import axios from 'axios'
import { server } from '../main'
import toast from 'react-hot-toast'

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = ({user}) => {
    const navigate=useNavigate()
    
    if(user && user.role!=="admin"){
        navigate("/")
    }

    const {courses,fetchCourses}=CourseData();
    
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[duration,setDuration]=useState("");
    const[createdBy,setCreatedBy]=useState("");
    const[image,setImage]=useState("");
    const[imagePrev,setImagePrev]=useState("");
    const[btnLoading,setBtnLoading]=useState(false);

    const changeImageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
          setImagePrev(reader.result);
          setImage(file);
        };
      };

      const submitHandler = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
    
        const myForm = new FormData();
    
        myForm.append("title", title);
        myForm.append("description", description);
        myForm.append("category", category);
        myForm.append("price", price);
        myForm.append("createdBy", createdBy);
        myForm.append("duration", duration);
        myForm.append("file", image);
    
        try {
          const { data } = await axios.post(`${server}/api/course/new`, myForm, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
    
          toast.success(data.message);
          setBtnLoading(false);
          await fetchCourses();
          setImage("");
          setTitle("");
          setDescription("");
          setDuration("");
          setImagePrev("");
          setCreatedBy("");
          setPrice("");
          setCategory("");
        } catch (error) {
          toast.error(error.response.data.message);
          setBtnLoading(false);
        }
      };

  return (
    <Layout>
        <div className="flex justify-center flex-wrap gap-4 px-[20px]">
            <div className="left">
                <h1 className="text-center text-2xl font-semibold my-4">All Courses</h1>
                <div className="flex justify-around flex-wrap gap-[20px] mt-[40px] ml-[5px]">
                    {courses && courses.length>0 ? (
                        courses.map((e)=>{
                            return <Coursecard key={e._id} course={e}/>
                        })
                    ) : (
                        <p>No courses found</p>
                    )}
                </div>
            </div>
            <div className="right">
                <div className="add-course">
                    <div className="bg-white p-[30px] rounded-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.1)] text-center w-[300px] mb-[20px]">
                        <h2 className="text-[24px] text-[#8a4baf] mb-[15px] font-semibold">Add Course</h2>
                        <form className="text-left flex flex-col gap-[10px]" onSubmit={submitHandler}>
                        <label className="text-[15px] text-[#333] mb-[5px] block">Title</label>
                        <input className="w-[92%] p-[10px] mb-[15px] border border-[#ccc] rounded-[5px]" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required placeholder='Enter title' />
                        
                        <label className="text-[15px] text-[#333] mb-[5px] block">Description</label>
                        <input className="w-[92%] p-[10px] mb-[15px] border border-[#ccc] rounded-[5px]" type="text" value={description} onChange={(e)=>setDescription(e.target.value)} required placeholder='Enter description' />
                        
                        <label className="text-[15px] text-[#333] mb-[5px] block">Price</label>
                        <input className="w-[92%] p-[10px] mb-[15px] border border-[#ccc] rounded-[5px]" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} required placeholder='Enter price' />
                        
                        <label className="text-[15px] text-[#333] mb-[5px] block">Created By</label>
                        <input className="w-[92%] p-[10px] mb-[15px] border border-[#ccc] rounded-[5px]" type="text" value={createdBy} onChange={(e)=>setCreatedBy(e.target.value)} required placeholder='Enter created by' />

                        <label className="text-[15px] text-[#333] mb-[5px] block">Category</label>
                        <select className="w-[92%] p-[10px] mb-[15px] border border-[#ccc] rounded-[5px]" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value={""}>Select Category</option>
                            {categories.map((e) => (
                                <option value={e} key={e}>
                                {e}
                                </option>
                            ))}
                        </select>

                        <label className="text-[15px] text-[#333] mb-[5px] block">Duration</label>
                        <input className="w-[92%] p-[10px] mb-[15px] border border-[#ccc] rounded-[5px]" type="number" value={duration} onChange={(e)=>setDuration(e.target.value)} required placeholder='Enter duration' />
                        
                        <label className="text-[15px] text-[#333] mb-[5px] block">Image</label>
                        <input className="w-[92%] p-[10px] mb-[15px] border border-[#ccc] rounded-[5px]" type="file" accept='image/*' onChange={changeImageHandler} required />
                        {imagePrev && <img src={imagePrev} alt="" width={300} className="mt-2 rounded-[5px]" />}

                        <button disabled={btnLoading} className="bg-[#8a4baf] mt-[20px] px-[20px] py-[10px] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300 w-full" type="submit">
                            {btnLoading ? "Please Wait..." : "Add"}
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminCourses