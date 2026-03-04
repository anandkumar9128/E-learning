import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [user,setuser]=useState([])
    const [isAuth,setIsAuth]=useState(false)
    const [btnLoading,setBtnLoading]=useState(false)
    const [loading,setLoading]=useState(true)

    async function loginUser(email,password,navigate,fetchMyCourse){
        setBtnLoading(true)
        try {
            const {data}=await axios.post(`${server}/api/user/login`,{email,password})
            toast.success(data.message)
            localStorage.setItem("token",data.token)
            setuser(data.user)
            setIsAuth(true)
            setBtnLoading(false)
            navigate("/")
            fetchMyCourse()
        } catch (error) {
            setBtnLoading(false)
            setIsAuth(false)
            toast.error(error.response.data.message)
        }
    }

    async function registerUser(name,email,password,navigate){
        setBtnLoading(true)
        try {
            const {data}=await axios.post(`${server}/api/user/register`,{name,email,password})
            toast.success(data.message)
            localStorage.setItem("activationToken",data.activationToken)
            setBtnLoading(false)
            navigate("/verify")
        } catch (error) {
            setBtnLoading(false)
            toast.error(error.response.data.message)
        }
    }

    async function fetchUser(){
        try {
            const token = localStorage.getItem("token");
            if(!token) {
                setLoading(false);
                setIsAuth(false);
                return;
            }
            const {data}=await axios.get(`${server}/api/user/me`,{headers:{token}})
            setuser(data.user)
            setIsAuth(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setIsAuth(false)
        }
    }

    async function verifyOtp(otp,navigate){
        setBtnLoading(true);
        try {
            const {data}=await axios.post(`${server}/api/user/verify`,{otp,activationToken:localStorage.getItem("activationToken")})
            toast.success(data.message)
            localStorage.clear()
            setBtnLoading(false)
            navigate("/login")
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false)
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])
    return (
        <UserContext.Provider value={{user,setuser,isAuth,setIsAuth,btnLoading,loginUser,loading,registerUser,verifyOtp,fetchUser}}>
            {children}
            <Toaster/>
        </UserContext.Provider>
    )
}

export const UserData=()=> useContext(UserContext)