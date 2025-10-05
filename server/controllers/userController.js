import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  // Condition Checking
  if (!email) {
    return res.status(400).json({ message: "Email Id is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Please enter a valid password" });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email Id" });
  }

  const userExists = await User.find({ email: email });

  if (userExists.length > 0) {
    return res
      .status(400)
      .json({ message: "Email already exists for another user" });
  }

  // creating User instance
  const user = new User({
    name,
    email,
  });

  // hashing the user entered password
  const hashedPassword = await user.hashPassword(password);

  user.password = hashedPassword;

  user.save();

  generateToken(res, user);
};

const loginUser = async (req, res) => {
  res.status(200).json({ message: "User loggged in successfully" });
};

export { registerUser, loginUser };
