import { instance } from "../index.js";
import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/courses.model.js";
import { Lecture } from "../models/lectures.model.js";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";
import { Progress } from "../models/progress.model.js";


export const getAllCourses=TryCatch(async(req,res)=>{
    const courses=await Courses.find()
    res.json({
        courses,
    })
})

export const getSingleCourse=TryCatch(async(req,res)=>{
    const course=await Courses.findById(req.params.id)

    res.json({
        course
    })
})

export const fetchLectures=TryCatch(async(req,res)=>{
    const lectures=await Lecture.find({course:req.params.id})
    
    const user=await User.findById(req.user._id)

    if(user.role==="admin"){
        return res.json({lectures});
    }

    if(!user.subscription.includes(req.params.id)) return res.status(400).json({
        message:"You have not subscribed to this course"
    })

    res.json({
        lectures
    })
})

export const fetchLecture=TryCatch(async(req,res)=>{
    const lecture=await Lecture.findById(req.params.id)
    
    const user=await User.findById(req.user._id)

    if(user.role==="admin"){
        return res.json({lecture});
    }

    if(!user.subscription.includes(lecture.course)) return res.status(400).json({
        message:"You have not subscribed to this course"
    })

    res.json({
        lecture
    })
})

export const getMyCourses=TryCatch(async(req,res)=>{
    const courses=await Courses.find({_id:{$in:req.user.subscription}})
    res.json({
        courses
    })
})

export const checkOut=TryCatch(async(req,res)=>{
    const user=await User.findById(req.user._id);

    const course=await Courses.findById(req.params.id);

    if(user.subscription.includes(course._id)) return res.status(400).json({
        message:"You have already subscribed to this course"
    })

    const options={
        amount:Number(course.price*100),
        currency:"INR",

    }
    const order=await instance.orders.create(options);

    res.json({
        order,
        course
    });
});

export const paymentVerification=TryCatch(async(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;

    const body=razorpay_order_id+"|"+razorpay_payment_id;

    const expectedSignature=crypto.createHmac("sha256",process.env.Razorpay_secret).update(body).digest("hex");

    if(expectedSignature!==razorpay_signature) return res.status(400).json({
        message:"Invalid payment"
    })

    await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    })

    const user=await User.findById(req.user._id);
    const course=await Courses.findById(req.params.id);
    user.subscription.push(course._id);

    await Progress.create({
        course:course._id,
        completedLectures:[],
        user:req.user._id,
    })

    await user.save(); 

    res.json({
        message:"Course purchased successful"
    })
})

export const addProgress=TryCatch(async(req,res)=>{
    const progress=await Progress.findOne({course:req.query.course,user:req.user._id});
    const {lectureId}=req.query;
    if(progress.completedLectures.includes(lectureId)){
        return res.json({
            message:"Progress recorded"
        })
    }
    progress.completedLectures.push(lectureId);
    await progress.save();
    res.status(201).json({
        message:"New Progress added"
    })
})

export const getYourProgress=TryCatch(async(req,res)=>{
    const progress=await Progress.find({course:req.query.course,user:req.user._id});
    if(!progress || progress.length === 0) {
        const allLectures = (await Lecture.find({ course: req.query.course })).length;
        return res.json({
            progress: [{completedLectures: []}],
            allLectures,
            completedLectures: 0,
            courseProgressPercentage: 0
        });
    }
    const allLectures = (await Lecture.find({ course: req.query.course })).length;

    const completedLectures = progress[0].completedLectures.length;

    const courseProgressPercentage = (completedLectures * 100) / allLectures;
    res.json({
        progress,
        allLectures,
        completedLectures,
        courseProgressPercentage
    })
})
