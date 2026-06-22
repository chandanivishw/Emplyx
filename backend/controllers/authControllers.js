import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    try {
        // your code
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists,Please login" });
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const user = await User.create({
                name, email, password: hashedPassword
            });
            return res.status(201).json({ message: "User registered successfully" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id,role:user.role }, process.env.JWT_SECRET, { expiresIn: "15d" });
        return res.status(200).json({ message: "Login successful", token, userId:user._id,role:user.role });


    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const logout = (req, res) => {
    res.status(200).json({ message: "Logout successful" });
}
