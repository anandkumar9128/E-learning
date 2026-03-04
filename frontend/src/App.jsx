import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Verify from './pages/auth/Verify'
import Footer from './components/Footer'
import About from './pages/About'
import Account from './pages/Account'
import { UserData } from './context/UserContext'
import Loading from './components/Loading'
import Courses from './pages/courses/Courses'
import CoursesDescription from './pages/courses/CoursesDescription'
import PaymentSuccess from './pages/PaymentSuccess'
import Dashboard from './pages/Dashboard'
import CourseStudy from './pages/CourseStudy'
import Lecture from './pages/Lecture'
import AdminDashboard from './admin/AdminDashboard'
import AdminCourses from './admin/AdminCourses'
import AdminUsers from './admin/AdminUsers'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'

const App = () => {
  const {isAuth,user,loading}=UserData()
  return (
    loading ? (<Loading/>) : (<BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header isAuth={isAuth}/>
        <main className="grow">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/courses' element={<Courses/>}/>
            <Route path='/account' element={isAuth ? <Account user={user}/> : <Login/>}/>
            <Route path='/login' element={isAuth ? <Home/> : <Login/>}/>
            <Route path='/register' element={isAuth ? <Home/> : <Register/>}/>
            <Route path='/verify' element={isAuth ? <Home/> : <Verify/>}/>
            <Route path='/forgot' element={isAuth ? <Home/> : <ForgotPassword/>}/>
            <Route path='/reset-password/:token' element={isAuth ? <Home/> : <ResetPassword/>}/>
            <Route path='/course/:id' element={isAuth ? <CoursesDescription user={user}/> : <Login/>}/>
            <Route path='/payment-success/:id' element={isAuth ? <PaymentSuccess user={user}/> : <Login/>}/>
            <Route path='/:id/dashboard' element={isAuth ? <Dashboard user={user}/> : <Login/>}/>
            <Route path='/course/study/:id' element={isAuth ? <CourseStudy user={user}/> : <Login/>}/>
            <Route path='/lectures/:id' element={isAuth ? <Lecture user={user}/> : <Login/>}/>
            <Route path='/admin/dashboard' element={isAuth ? <AdminDashboard user={user}/> : <Login/>}/>
            <Route path='/admin/course' element={isAuth ? <AdminCourses user={user}/> : <Login/>}/>
            <Route path='/admin/users' element={isAuth ? <AdminUsers user={user}/> : <Login/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>)
  )
}

export default App
