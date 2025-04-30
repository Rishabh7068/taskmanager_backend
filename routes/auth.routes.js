import express from "express";
import { login, signup, verifyOtp } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login",login); 
router.post("/signup",signup); 
router.post("/verifyotp",verifyOtp); 


export default router;
