import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { server } from '../main'
import axios from 'axios'
import Loading from '../components/Loading'
import toast from 'react-hot-toast'
const Lecture = ({user}) => {
    const params=useParams()
    const navigate=useNavigate()

    const [lectures,setLectures]=useState([]);
    const [lecture,setLecture]=useState([]);
    const [loading,setLoading]=useState(true);
    const [lectureLoading,setLectureLoading]=useState(false);
    const [show,setShow]=useState(false);


    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [video,setVideo]=useState(null);
    const [videoPrev,setVideoPrev]=useState("");
    const [btnLoading,setBtnLoading]=useState(false);

    if(user && user.role!=="admin" && !user.subscription.includes(params.id)){
      navigate("/")
    }

    const fetchLectures=async()=>{
      try {
          const {data}=await axios.get(`${server}/api/lectures/${params.id}`,{
              headers:{
                token:localStorage.getItem("token")
              }
          })
          setLectures(data.lectures)
          setLoading(false)
      } catch (error) {
          console.log(error)
          setLoading(false)
      }
    }

    const changeVideoHandler=(e)=>{
      const file=e.target.files[0];
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setVideoPrev(reader.result);
        setVideo(file);
      }
    }

    const submitHandler=async(e)=>{
      e.preventDefault();
      setBtnLoading(true);
      
      const myForm=new FormData();
      myForm.append("title",title);
      myForm.append("description",description);
      myForm.append("file",video);

      try {
        const {data}=await axios.post(`${server}/api/course/${params.id}`,myForm,{
            headers:{
              token:localStorage.getItem("token")
            }
        })
        setBtnLoading(false);
        setShow(false);
        fetchLectures();
        toast.success(data.message);
        setTitle("");
        setDescription("");
        setVideo(null);
        setVideoPrev("");
      } catch (error) {
        toast.error(error.response.data.message);
        setBtnLoading(false);
      }
    }

    const deleteHandler=async(id)=>{

      if(confirm("Are you sure you want to delete this lecture?")){
        try {
          const {data}=await axios.delete(`${server}/api/lecture/${id}`,{
              headers:{
                token:localStorage.getItem("token")
              }
          })
          toast.success(data.message);
          fetchLectures();
          if(lecture._id===id){
            setLecture({_id:""});
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }

    async function fetchLecture(id){
      setLectureLoading(true)
      try {
        const {data}=await axios.get(`${server}/api/lecture/${id}`,{
            headers:{
              token:localStorage.getItem("token")
            }
        })
        setLecture(data.lecture)
        setLectureLoading(false)
      } catch (error) {
        console.log(error)
        setLectureLoading(false)
      }
    };

    const [completed,setCompleted]=useState("");
    const [completedLec,setCompletedLec]=useState("");
    const [lecLength,setLecLength]=useState("");
    const [progress,setProgress]=useState([]);

    async function fetchProgress(){
      try {
        const {data}=await axios.get(`${server}/api/user/progress?course=${params.id}`,{
            headers:{
              token:localStorage.getItem("token")
            }
        })
        setCompleted(data.courseProgressPercentage)
        setCompletedLec(data.completedLectures)
        setLecLength(data.allLectures)
        setProgress(data.progress)
      } catch (error) {
        console.log(error)
      }
    }

    const addProgress=async(id)=>{
      try {
        const {data}=await axios.post(`${server}/api/user/progress?course=${params.id}&lectureId=${id}`,{},{
            headers:{
              token:localStorage.getItem("token")
            }
        })
        console.log(data.message)
        fetchProgress();
      } catch (error) {
        console.log(error.response.data.message)
      }
    }

    useEffect(()=>{
        fetchLectures();
        fetchProgress();
    },[])
  return (
    <>
      {
        loading ? <Loading/> : <>
          {user && user.role !== "admin" && <div className="w-[20%] bg-[#333] p-[6px] rounded-[5px] my-[3px] mx-auto text-center text-white">
            Lecture Completed: {completedLec} out of {lecLength} <br />
            <progress value={completed} max="100"></progress>{completed}%
          </div>}
          <div className='flex flex-col md:flex-row justify-center md:justify-between min-h-[80vh]'>
            <div className='w-[90%] md:w-[70%] p-[10px] items-center'>
              {lectureLoading ? <Loading/> : <>
                {lecture.video ? <>
                  <video src={`${server}/${lecture.video}`} controlsList='nodownload noremoteplayback' disablePictureInPicture autoPlay controls onEnded={()=>addProgress(lecture._id)}></video>
                  <h1>{lecture.title}</h1>
                  <h3>{lecture.description}</h3>
                </> : <h1 className='text-[24px] font-semibold '>Please Select a Lecture</h1>}
              </>}
            </div>
            <div className='w-[80%] md:w-[30%] mb-[10px] md:mb-0'>
                  {user && user.role==="admin" && (<button onClick={()=>setShow(!show)} className='bg-[#8a4baf] mt-[20px] px-[20px] py-[10px] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300'>
                    {show?"Close":"Add Lecture +"}
                  </button>
                  )}

                  {
                    show && (<div className="bg-white p-[30px] rounded-[10px] shadow-md text-center w-auto">
                      <h2 className='text-[24px] text-[#8a4baf] mb-[15px] font-semibold'>
                        Add Lecture
                      </h2>
                      <form onSubmit={submitHandler} className='text-left' >
                        <label className='block mb-[5px] text-[14px] text-[#333]' htmlFor="text">Title</label>
                        <input value={title} onChange={(e)=>setTitle(e.target.value)} className='w-[92%] p-[10px] mb-[15px] border border-black rounded-[5px]' type="text" required />

                        <label className='block mb-[5px] text-[14px] text-[#333]' htmlFor="text">Description</label>
                        <input value={description} onChange={(e)=>setDescription(e.target.value)} className='w-[92%] p-[10px] mb-[15px] border border-black rounded-[5px]' type="text" required />

                        <input onChange={changeVideoHandler} className='w-[92%] p-[10px] mb-[15px] border border-black rounded-[5px]' type="file" placeholder='Upload Video' required />

                        {
                          videoPrev && (
                            <video src={videoPrev} width={300} controls></video>
                          )
                        }
                        
                        <button disabled={btnLoading} className='bg-[#8a4baf] mt-[20px] px-[20px] py-[10px] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300' type="submit">{btnLoading ? "Adding..." : "Add"}</button>
                      </form>
                    </div>
                  )}
                  {
                    lectures && lectures.length>0 ? lectures.map((e,i)=>(
                      <>
                        <div className={`p-[10px] border border-black mt-[10px] rounded-[5px] text-center cursor-pointer hover:bg-[#8a4baf] hover:text-white ${lecture._id===e._id ? "bg-[#8a4baf] text-white" : "bg-white"}`} onClick={()=>fetchLecture(e._id)} key={i}>
                          {i+1}. {e.title} {progress && progress[0] && progress[0].completedLectures && progress[0].completedLectures.includes(e._id) && <span className="text-green-500 font-bold">✓</span> }
                        </div>

                        {
                          user && user.role==="admin" && (
                            <button onClick={()=>deleteHandler(e._id)} className='bg-[#ce4242] mt-[20px] px-[20px] py-[10px] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#ad0000] transition-all duration-300'>Delete Lecture {i+1}</button>
                          )
                        }
                      </>
                    )) :<p>No lectures yet!</p>
                  }
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Lecture