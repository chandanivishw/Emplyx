import express from "express";
import { createEmployee, deleteEmployee, getAllEmployees, getSingleEmployee, updateEmployee } from "../controllers/employeeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
const router = express.Router();

router.post("/createEmployee",authMiddleware,roleMiddleware("admin"),createEmployee);
router.get("/getAllEmployees",authMiddleware,roleMiddleware("admin"),getAllEmployees);
router.get("/getSingleEmployee/:id",authMiddleware,roleMiddleware("admin","employee"),getSingleEmployee);
router.put("/updateEmployee/:id",authMiddleware,roleMiddleware("admin","employee"),updateEmployee);
router.delete("/deleteEmployee/:id",authMiddleware,roleMiddleware("admin"),deleteEmployee);

export default router;
