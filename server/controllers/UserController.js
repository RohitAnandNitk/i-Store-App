import User from "../models/UserModel.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/features.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, city, address, country, phone, answer } =
      req.body;

    //validation
    if (
      !name ||
      !email ||
      !password ||
      !city ||
      !address ||
      !country ||
      !phone ||
      !answer
    ) {
      return res
        .status(500)
        .send({ success: false, message: "Please Provide all feilds" });
    }
    // check existing user
    const existingUser = await User.findOne({ email });
    // validation
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email already taken",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      city,
      address,
      country,
      phone,
      answer,
    });

    res
      .status(201)
      .send({ success: true, message: "Registration successful", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

// login function
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please enter email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Wrong Password",
      });
    }

    // Generate JWT Token
    const token = user.generateToken();

    // Set cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
      secure: process.env.NODE_ENV === "production", // Only true in production (HTTPS)
      httpOnly: true, // Prevent access via JavaScript
      sameSite: "Strict", // Prevent CSRF attacks
    });

    // Send response
    res.status(200).send({
      success: true,
      message: "Login successful",
      user,
      token, // Optional: Can be stored in frontend state
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error: error.message,
    });
  }
};

// profile
export const userProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).send({
      success: true,
      message: "User Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error at user Profile API",
      error,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).send({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error at user Logout API",
      error,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, phone, address, city, country } = req.body;
    // validation and change
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    // save
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Profile Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error at update profile API",
      error,
    });
  }
};

export const updatePasswordController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;
    //validation
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please enter all fields",
      });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Old password is not Correct",
      });
    }

    // update new password
    user.password = newPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error at update password API",
      error,
    });
  }
};

export const updateProfilePicController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // get file for updation
    const file = getDataUri(req.file);
    // delete the previous pic
    await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
    //update new pic
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    user.profilePic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    await user.save();
    res.status(200).send({
      success: true,
      message: "Profile picture updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error at update profile pic API",
      error,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // user get email || newPassword || answer
    const { email, newPassword, answer } = req.body;
    // valdiation
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    // find user
    const user = await User.findOne({ email, answer });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "invalid user or answer",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Your Password Has Been Reset Please Login !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In password reset API",
      error,
    });
  }
};
