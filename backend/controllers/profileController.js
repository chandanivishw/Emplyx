import User from "../model/User.js";
// 👉 GET PROFILE
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "Profile fetched successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};


// 👉 UPDATE PROFILE
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true }
        ).select("-password");

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export { getProfile, updateProfile };