import Employee from "../model/Employee.js";
// create employee
const createEmployee = async (req, res) => {
    try {
        const { name, email, salary, position, contact, department } = req.body;
        const {id} = req.params;
        const userId = req.user._id;
        // const userId = req.body.userId; // Assuming the userId is sent in the request body. Adjust this according to your authentication logic.
        if (!name || !email || !salary || !position || !contact || !department) {
            return res.status(400).json({ message: "Please fill all fields" });
        } else {
            const existingEmployee = await Employee.findOne({ email });
            if (existingEmployee) {
                return res.status(400).json({ message: "Employee already exists" });
            }
            const employee = await Employee.create({
                name, email, salary, position, contact, department, userId
            });
            return res.status(201).json({ message: "Employee created successfully", employee });
        }
    } catch (error) {
         console.log(error); // 🔥 IMPORTANT
         return res.status(500).json({message:error.message});
    }

}
// get all employees
const getAllEmployees = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const allEmployees = await Employee.find();
        // const allEmployees = await Employee.find().populate("userId","role");2.
        // const allemployees= await Employee.find().populate("userId");1.
        return res.status(200).json({ message: "All employees fetched successfully", allEmployees });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
// get single employee
const getSingleEmployee = async (req, res) => {
    try {
        let employee;
        const { id } = req.params;
        if (req.user.role === "admin") {
            employee = await Employee.findById(id).populate("userId");

        } else {
            employee = await Employee.findOne({ userId: req.user._id }).populate("userId");
            if (!employee || employee._id.toString() !== id) {
                return res.status(403).json({ message: "Access denied" });
            }

        }
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        return res.status(200).json({ message: "Employee fetched successfully", employee });

    } catch (error) {
         console.log(error); // 🔥 IMPORTANT
         return res.status(500).json({message:error.message});
    }

}
// update employee
const updateEmployee = async (req,res)=>{
try{
    const {id} = req.params;
    const {name,email,salary,position,contact,department} = req.body;
    const updateData = {name,email,salary,position,contact,department};
    // if(!name || !email || !salary || !position || !contact || !department){
    //     return res.status(400).json({message:"Please fill all fields"});
    // }
    let employee;
    if(req.user.role === "admin"){
        employee = await Employee.findByIdAndUpdate(id,updateData,{new:true});

    }else{
       const existingEmployee = await Employee.findOne({userId:req.user._id});
        if(!existingEmployee || existingEmployee._id.toString() !== id){
        return res.status(403).json({message:"Access denied"});
        }
        employee = await Employee.findByIdAndUpdate(id,updateData,{new :true});
       
    }
   if(!employee){
      return res.status(404).json({message:"Employee not found"});
   } 
    return res.status(200).json({message:"Employee updated successfully",employee});
}catch(error){
    console.log(error); // 🔥 IMPORTANT
    return res.status(500).json({message:error.message});
}
}
// detele employee
const deleteEmployee = async (req,res)=>{
try{
    const {id} = req.params;
    let employee;
    if(req.user.role === "admin"){
        employee = await Employee.findByIdAndDelete(id);
    }else{
        const existingEmployee = await Employee.findOne({userId:req.user._id});
        if(!existingEmployee || existingEmployee._id.toString() !== id){
            return res.status(403).json({message:"Access denied"});
        }
        employee = await Employee.findByIdAndDelete(id);
    }
    if(!employee){
    return res.status(404).json({message:"Employee not found"});
    }
    return res.status(200).json({message:"Employee deleted successfully",employee});
}catch(error){
     console.log(error); // 🔥 IMPORTANT
         return res.status(500).json({message:error.message});
}
}


export { createEmployee, getAllEmployees, getSingleEmployee, updateEmployee, deleteEmployee };