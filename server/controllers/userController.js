import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  res.status(200).json({ message: "User registered successfully" });
};

export { registerUser };
