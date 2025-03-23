import express from "express";
import {
  registerController,
  loginController,
  userProfileController,
  logoutController,
  updateProfileController,
  updatePasswordController,
  updateProfilePicController,
  resetPassword,
} from "../controllers/UserController.js";
import { isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";
import rateLimiter from "express-rate-limit";

const router = express.Router();

// Rate Limiter
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standeresHeaders: "draft-7",
  lagacyHeaders: false,
});

router.post("/register", limiter, registerController);
router.post("/login", limiter, loginController);
router.get("/profile", isAuth, userProfileController);
router.get("/logout", isAuth, logoutController);
router.put("/update-profile", isAuth, updateProfileController);
router.put("/update-password", isAuth, updatePasswordController);
router.put(
  "/update-profile-pic",
  isAuth,
  singleUpload,
  updateProfilePicController
);

router.put("/reset-password", resetPassword);

export default router;
