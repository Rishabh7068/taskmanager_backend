import { config } from "dotenv";
import User from '../schema/user.schema.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sendEmail from "../util/sendEmail.js";
config();

const JWT_secret = process.env.JWT;


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    console.log("User not found, creating a new user");

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);


    let otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 24 * 60 * 60 * 1000;
    let hashedOtp = await bcrypt.hash(otp , 10);

    user = await User.create({
        name,
        email,
        password: secPass,
        otp : hashedOtp,
        otpExpires,
    });

    console.log("User created successfully");
    const message = `Please check your email , your verification code is ${otp}`;
    await sendEmail(email, "Email Verification", message);

    res.status(200).json({
        message: "user registered successfully please check your email",
        success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Error Creating User" });
  }
};
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      if (!user.emailVerified) {
        return res.status(400).json({ error: "Please verify your email first" });
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      const data = {
        user: {
          id: user.id,
        },
      };
  
      const authToken = jwt.sign(data, JWT_secret ,  {expiresIn : "1d"});
      res.status(200).json({
        authToken: authToken,
        success: true,    
        name: user.name,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error Logging In User" });
    }
};



export const verifyOtp = async (req , res) => {
  const {email , otp} = req.body;
  try {
      const user = await User.findOne({email});
      if(!user) {
          return res.status(400).json({message : "invalid email or otp"}); 
      }

      if(Date.now() > user.otpExpires) {
          return res.status(400).json({ message: "invalid or expired OTP" });
      }
  
      const isMatch = await bcrypt.compare(otp, user.otp);
      if(!isMatch) {
          return res.status(400).json({ message: "invalid otp" });
      }
    
      user.emailVerified = true;
      user.otp = undefined; 
      user.otpExpires = undefined;
      await user.save();

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_secret, {expiresIn : "1d"})
      res.status(200).json({authToken , name: user.name , message : "email verified successfully" , success : true});
  
  }catch (err) {
      console.error(err.message);
      res.status(500).json({message : "Server Error"});
  }
}






