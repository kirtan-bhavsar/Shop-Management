import express from "express";
import dotenv from "dotenv/config";
import connectDB from "./db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

const port = process.env.PORT;

connectDB();

// Mounting Routers
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.json({
    message: "API Running successfully...",
  });
});

app.listen(port, () => {
  console.log(`Server Running successfully on port ${port}`);
});
