import express from "express";
import {
  createUser,
  loginUser,
  getUsers,
} from "../controller/authUser.controller.js";
const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getUsers);
// userRouter.get("/validator", validatetoken);

export default userRouter;
