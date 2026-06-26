import jwt from "jsonwebtoken";
import User from "../model/User.js";
export const authMiddleware =async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ meassge: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decoded;// pehle

//         // ✅ ab ye karo
// req.user =  User.findById(decoded.userId);
const user = await User.findById(decoded.userId);

req.user = user; // 🔥 pura user object

        next();
    } catch (error) {
        console.log(error); // 🔥 IMPORTANT
        return res.status(401).json({ message: "Unauthorized" });
    }

} 