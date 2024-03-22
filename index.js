import express from "express";
import mongoose from "mongoose";
const app = express(); //initializing the express
import tourRoutes from "./routes/tour.routes.js";
import userRouter from "./routes/user.routes.js";
import dotenv from "dotenv";
// middleware to accept jsson
app.use(express.json());


//configuring the environmental variables path
dotenv.config();
//defining route,
app.use("/tour", tourRoutes);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ massage: "hello from this server" });
});
//getting all the tours

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("failed", error.massage);
  });

//CKk461ytSbwvkVA9
//mongodb+srv://omoleoladele43:CKk461ytSbwvkVA9@mydb.nari3ti.mongodb.net/?retryWrites=true&w=majority&appName=myDB
//mongodb+srv://omoleoladele43CKk461ytSbwvkVA9:@mydb.nari3ti.mongodb.net/
