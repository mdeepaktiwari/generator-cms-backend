const User = require("../models/auth");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    console.log("Start processing of signing up request");
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, password is required",
      });
    }

    // check if the user already exists in our database
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // return user if required
    const updatedUser = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    return res.status(201).json({
      message: "User signed up successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(`Error in signing up user ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
