import express from "express";
import {
  getUser,
  login,
  logOut,
  register,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/add", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getUser);
router.get("/logout", isAuthenticated, logOut);
export default router;
