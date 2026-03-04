import express from 'express';
import dotenv from "dotenv";
import { connectDb } from './database/db.js';
import Razorpay from "razorpay";
import cors from "cors";

dotenv.config();

export const instance=new Razorpay({
    key_id:process.env.Razorpay_key,
    key_secret:process.env.Razorpay_secret
})

const app=express();

const port=process.env.PORT;

// using middleware
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Server is running");
});

app.use("/uploads",express.static("uploads"))

//importing routes
import userRoutes from "./routes/user.route.js";
import courseRoutes from './routes/course.routes.js';
import adminRoutes from './routes/admin.routers.js'

//using routes
app.use('/api',userRoutes);
app.use('/api',courseRoutes);
app.use('/api',adminRoutes);


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
    connectDb();
})