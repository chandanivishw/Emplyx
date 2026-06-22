export const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!roles.includes(req.user.role)) {
      console.log("Access denied for role:", req.user.role); // 🔥 IMPORTANT
      return res.status(403).json({ message: "Access deniedhhhj" });

    }
    next();
  };
};