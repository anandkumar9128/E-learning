import express from "express";
import { forgotPassword, loginUser, myProfile, register, resetPassword, verifyUser } from "../controllers/user.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { addProgress, getYourProgress } from "../controllers/courses.controller.js";

const router=express.Router();
router.post('/user/register',register)
router.post("/user/verify",verifyUser)
router.post("/user/login",loginUser)
router.get("/user/me",isAuth,myProfile)
router.post("/user/forgot",forgotPassword)
router.post("/user/reset",resetPassword)
router.post("/user/progress",isAuth,addProgress)
router.get("/user/progress",isAuth,getYourProgress)

export default router;