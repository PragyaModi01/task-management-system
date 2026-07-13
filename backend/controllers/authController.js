import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// user registation
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exsts",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User registered sucessfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token,
      },
    });
  } catch (error) {
    console.log("Registration error", error);

    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0].message;

      return res.status(400).json({
        success: false,
        message: firstError,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// login user logic
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // password se user get kiya
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // compare password
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // token generation
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token,
      },
    });
  } catch (error) {
    console.log("checking login error", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
};
