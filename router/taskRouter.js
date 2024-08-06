import express from "express";
import { addTask, deleteTask, getTask, updateTask } from "../controller/taskController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addTask);
router.get("/get", isAuthenticated, getTask);
router.delete("/delete/:id", isAuthenticated, deleteTask);
router.put("/updated/:id", isAuthenticated, updateTask);

export default router;
