import express from "express";
import { createEmployee, deleteEmployee, getAllEmployees, getSingleEmployee, updateEmployee } from "../controllers/employeeController";
const router = express.Router();

router.post("/createEmployee",createEmployee);
router.get("/getAllEmployees",getAllEmployees);
router.get("/getSingleEmployee/:id",getSingleEmployee);
router.put("/updateEmployee/:id",updateEmployee);
router.delete("/deleteEmployee/:id",deleteEmployee);

export default router;
