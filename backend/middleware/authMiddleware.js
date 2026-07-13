import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectMid = async (req, res, next) => {
    try {
        let token;

        // Authorization header se token get kiya
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // If token not found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token is missing",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not foud.",
            });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

export default protectMid;