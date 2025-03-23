import JWT from "jsonwebtoken";
import User from "../models/UserModel.js";

// User auth
export const isAuth = async (req, res, next) => {
  try {
    // Corrected req.cookies instead of req.cookie
    const { token } = req.cookies;

    // Validations
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user, token missing",
      });
    }

    // Verify Token
    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
    if (!decodeData) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user, invalid token",
      });
    }

    // Fetch user and attach to request object
    req.user = await User.findById(decodeData._id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

// ADMIN AUTH
export const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).send({
      success: false,
      message: "admin only",
    });
  }
  next();
};
