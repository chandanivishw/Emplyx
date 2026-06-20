import monoose from 'mongoose';
const employeeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{type:String,required:true},
    email:{type:String,unique: true },
    salary:{type:Number},
    position:{type:String},
    contact:{type:String},
    department:{type:String},
    
},{timestamps:true});
const Employee = mongoose.model("Employee",employeeSchema);
export default Employee;