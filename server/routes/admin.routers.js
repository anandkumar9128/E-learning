import express from "express";
import { isAdmin, isAuth } from "../middleware/isAuth.js";
import { addLectures, createCourse, deleteCourse, getAllStats, getAllUsers, updateRole } from "../controllers/admin.controller.js";
import { deleteLecture } from "../controllers/admin.controller.js";
import { uploadFiles } from "../middleware/multer.js";

const router=express.Router();
router.post('/course/new',isAuth,isAdmin,uploadFiles,createCourse);
router.post('/course/:id',isAuth,isAdmin,uploadFiles,addLectures);
router.delete('/course/:id', isAuth, isAdmin, deleteCourse);
router.delete('/lecture/:id', isAuth, isAdmin, deleteLecture);
router.get('/stats',isAuth,isAdmin,getAllStats);
router.get('/users',isAuth,isAdmin,getAllUsers);
router.put('/user/:id',isAuth,updateRole);

export default router;