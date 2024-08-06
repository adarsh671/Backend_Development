import express from "express";
import { dbconnection } from "./database/dbconnection.js";
import userRouter from "./router/userRouter.js";
import taskRouter from "./router/taskRouter.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
const app = express();


config({ path: "./config/config.env" });

app.use(cors({
  origin:[process.env.FRONTEND_URI],
  methods:["GET","PUT","POST","DELETE"],
  credentials:true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user", userRouter);
app.use("/task", taskRouter);

dbconnection();
app.listen(process.env.PORT, (req, res) => {
  console.log("Server running on port 4000");
});
