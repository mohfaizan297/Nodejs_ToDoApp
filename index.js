const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config("./.env");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const taskRouter = require("./routers/taskRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// dbConnect();

//Using Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);

// app.listen(process.env.PORT, () => {
//   console.log(`server is listening on ${process.env.PORT}`);
// });

module.exports = app;
