import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import { useEffect,useState } from 'react'
import { server } from '../../main'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { UserData } from '../../context/UserContext'
import Loading from '../../components/Loading'

const CoursesDescription = ({user}) => {
    const params=useParams()

    const {fetchUser}=UserData()
    const {course,fetchCourse,fetchCourses,fetchMyCourse}=CourseData()
    const navigate=useNavigate()

    const [loading,setLoading]=useState(false)

    const checkoutHandler=async()=>{
        const token=localStorage.getItem("token")
        setLoading(true)

        try {
            const {data:{order}}=await axios.post(`${server}/api/course/checkout/${params.id}`,{},{
                headers:{
                    token
                }
            })
            const options={
                "key": "rzp_test_SItoIb4PVaW0Yy", // Enter the Key ID generated from the Dashboard
                "amount": order.id, // Amount is in currency subunits. 
                "currency": "INR",
                "name": "E learning", //your business name
                "description": "Learn with us",
                "order_id": order.id,
                handler:async function(response){
                    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=response
                    try {
                        const {data}=await axios.post(`${server}/api/verification/${params.id}`,{
                            razorpay_order_id,
                            razorpay_payment_id,
                            razorpay_signature
                        },{
                            headers:{
                                token
                            }
                        })
                        await fetchUser()
                        await fetchCourses()
                        await fetchMyCourse()
                        toast.success(data.message)
                        setLoading(false)
                        navigate(`/payment-success/${razorpay_payment_id}`)
                    } catch (error) {
                        toast.error(error.response.data.message)
                        setLoading(false)
                    }
                },
                theme:{
                    color:"#8a4baf"
                },
                modal: {
                    ondismiss: function() {
                        console.log("checkout form closed");
                        setLoading(false);
                    }
                }
            }
            const razorpay=new window.Razorpay(options)

            razorpay.on('payment.failed', function (response){
                toast.error(response.error.description);
                setLoading(false);
            });

            razorpay.open()
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCourse(params.id)
    },[])
  return (
    <>
    {
        loading ? (<Loading/>)
        :
        (
        <>
        {course && (
            <div className="p-[80px] text-center min-h-[55vh]">
                <div className="flex items-center justify-center gap-[20px] flex-wrap mb-[40px]">
                    <img src={`${server}/${course.image}`} alt="" className='w-[200px] h-[150px] object-cover rounded-[10px]'/>
                    <div className="text-left ">
                        <h2 className='text-[24px] font-semibold '>{course.title}</h2>
                        <p className='text-[14px] text-[#666] my-[5px]'>Instructor : {course.createdBy}</p>
                        <p className='text-[14px] text-[#666] my-[5px]'>Duration : {course.duration} weeks</p>
                    </div>
                </div>
                <p className='text-[14px] text-[#333] text-center max-w-[800px] mx-auto'>{course.description}</p>
                <p className='text-[14px] text-[#333] text-center max-w-[800px] mx-auto'>Lets get started with course At ₹{course.price}</p>
                    {
                        user && user.subscription.includes(course._id) ? (
                            <button onClick={()=>navigate(`/course/study/${course._id}`)} className='bg-[#8a4baf] mt-[20px] px-[20px] py-[10px] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300'>Study Now</button>
                        ) : (
                            <button onClick={checkoutHandler} className='bg-[#8a4baf] mt-[20px] px-[20px] py-[10px] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300'>Buy Now</button>
                        )
                    }
            </div>
        )}
        </>
        )
    }
    </>
  )
}

export default CoursesDescription