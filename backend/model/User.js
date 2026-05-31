import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    role:{type:String,default:"employee"}, 
}, {timestamps:true});
const User = new mongoose.model("User",userSchema);
export default User;