import express from "express";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
connectDB();

const app = express();
app.use(express.json());

// app.use("/",(req,res)=>{
// res.send("server is running...");
// })

// routes
app.use("/api/auth",authRoutes);//auth routes
app.use("/api/employee",employeeRoutes);// emp routes

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
   
});