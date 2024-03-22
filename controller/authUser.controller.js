import users from "../models/users.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
//using the jsonwebtoken
import jwt from "jsonwebtoken";
// import express from "express";
// import cookieParser from "cookie-parser";

// const app = express();
// app.use(cookieParser());

//creating a function that assing secret
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//getting all the users
const getUsers = async (req, res) => {
  try {
    const allUsers = await users.find({});
    res.status(200).json({
      success: true,
      users: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, photo, password } = req.body;
    //validating email: using validator.js
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
      return;
    }
    //using bcryptjs to hash password
    const salt = await bcrypt.genSalt(10);
    const saltedPass = await bcrypt.hash(password, salt);

    //above all the logic goes:
    const created_User = await users.create({
      name,
      email,
      photo,
      password: saltedPass,
    });

    res.status(201).json({
      success: true,
      message: "user created succesfully",
      created_User,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " user not created",
      error: error.message,
    });
  }
};

//compare pasword function

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //check if email is valid in the database
  const validEmail = await users.findOne({ email: email }).exec();

  if (!validEmail) {
    res.status(404).json({
      success: false,
      message: "Invalid credentials.",
    });
    return;
  }

  //check if the password is correct
  const validPassword = await bcrypt.compare(password, validEmail.password);

  if (!validPassword) {
    res.status(409).json({
      success: false,
      message: "Invalid credentials.",
    });
    return;
  }

  //we will generate our access token and refresh token using jwt
  const accessToken = jwt.sign(
    {
      access1: validEmail.username,
      access2: validEmail._id,
    },
    process.env.BLABLA,
    {
      expiresIn: "5m",
    }
  );

  const refreshToken = jwt.sign(
    {
      access1: validEmail.username,
      access2: validEmail._id,
    },
    process.env.BLAREFBLA,
    {
      expiresIn: "1d",
    }
  );

  //push to cookies
  res.cookie("hellomiss", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 5 * 60 * 1000,
  });
  res.cookie("hellobro", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  //validating user

  return res.status(200).json({
    success: true,
    message: "Login successful.",
  });
};

// const validatetoken = async (req, res) => {
//   try {
//     const cookies = req.cookies.hellobro;
//     console.log("hellomiss =>", cookies);
//     console.log(req.signedCookies);
//     return res.status(200).json({
//       message: "sucessful",
//     });
//   } catch (error) {}
// };

//middle ware function that runs and check if a user is authentication and grants permission to the user

//pushing to cookies

export { createUser, loginUser, getUsers };

// const register = async (req, res) => {
//   try {
//     const { name, email, password, bio, sex } = req.body;

// if(!name && !email){
//   res.status(400).json({
//     success: false,
//     message: "all fields are required",
//     error: error.message,
//   });
//   return;
// }
// //check for existing email
// const existingEmail = await user.findOne({ email: req.body.email }).exec();

// if (existingEmail) {
//   res.status(409).json({
//     success: false,
//     message: "user already exists",
//     error: error.message,
//   });
//   return;
// }

//password encription here:
//     const salt = await bcrypt.genSalt(15);
//     const encryptedPassword = await bcrypt.hash(password, salt);

//     const newUser = await user.create({
//       password: encryptedPassword,
//       name,
//       email,
//       bio,
//       sex,
//     });
//     res.status(201).json({
//       success: true,
//       massage: "user register successful",
//       newUser,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "user not created",
//       error: error.message,
//     });
//   }
// };

// export { register };
