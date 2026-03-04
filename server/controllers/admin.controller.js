import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/courses.model.js";
import { Lecture } from "../models/lectures.model.js";
import {promisify} from "util"
import fs from "fs"
import { User } from "../models/user.model.js";
import {rm} from "fs";

export const createCourse=TryCatch(async(req,res)=>{
    const {title,description,category, createdBy,duration,price}=req.body;

    const image=req.file;

    const course=await Courses.create({
        title,
        description,
        category,
        createdBy,
        image:image?.path,
        duration,
        price,
    });
    res.status(201).json({
        message: "Course created successfully.",
    })
})

export const addLectures=TryCatch(async(req,res)=>{
    const course=await Courses.findById(req.params.id)

    if(!course) return res.status(404).json({
        message:"No Course with this id"
    })

    const {title,description}=req.body;
    const file=req.file

    const lecture=await Lecture.create({
        title,
        description,
        video:file?.path,
        course:course._id
    });
    res.status(201).json({
        message:"Lecture added successfully",
    })
})

const unlinkAsync=promisify(fs.unlink)

export const deleteLecture=TryCatch(async(req,res)=>{
    const lecture=await Lecture.findById(req.params.id);

    if(!lecture) return res.status(404).json({
        message:"Lecture not found"
    })

    if(lecture.video) {
        try {
            await unlinkAsync(lecture.video);
            console.log("video deleted");
        } catch (error) {
            console.log("Error deleting video:", error);
        }
    }

    await lecture.deleteOne();

    res.json({
        message:"Lecture deleted"
    })
})

export const deleteCourse=TryCatch(async(req,res)=>{
    const course=await Courses.findById(req.params.id)

    if(!course) return res.status(404).json({
        message:"Course not found"
    })

    const lectures=await Lecture.find({course:course._id})

    await Promise.all(
        lectures.map(async(lecture)=>{
            if(lecture.video) {
                try {
                    await unlinkAsync(lecture.video);
                    console.log("video deleted");
                } catch (error) {
                    console.log("Error deleting video:", error);
                }
            }
        })
    )

    if(course.image) {
        try {
            await unlinkAsync(course.image);
            console.log("image deleted");
        } catch (error) {
            console.log("Error deleting image:", error);
        }
    }

    await Lecture.find({course:req.params.id}).deleteMany();
    await course.deleteOne();
    await User.updateMany({},{$pull:{subscription:req.params.id}});
    res.json({
        message:"Course Deleted"
    })
})

export const getAllStats=TryCatch(async(req,res)=>{
    const totalCourses=(await Courses.find()).length;
    const totalLectures=(await Lecture.find()).length;
    const totalUsers=(await User.find()).length;

    const stats={
        totalCourses,
        totalLectures,
        totalUsers,
    }

    res.json({
        stats
    })
});

export const getAllUsers=TryCatch(async(req,res)=>{
    const users=await User.find({_id:{$ne:req.user._id}}).select("-password");

    res.json({
        users
    })
})

export const updateRole=TryCatch(async(req,res)=>{

    if(req.user.mainrole!=="superadmin") return res.status(403).json({
        message:"This endpoint is assigned to superadmin"
    })

    const user=await User.findById(req.params.id);

    if(!user) return res.status(404).json({
        message:"User not found"
    })

    if (user.role === "user") {
        user.role = "admin";
        await user.save();

        return res.status(200).json({
            message: "Role updated to admin",
        });
    }

    if (user.role === "admin") {
        user.role = "user";
        await user.save();

        return res.status(200).json({
        message: "Role updated",
        });
    }
});