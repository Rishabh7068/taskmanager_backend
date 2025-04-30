import express from "express";
import fetchuser from '../middelware/fetchuser.js'
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/task.controllers.js";

const router = express.Router();

router.get("/getalltasks", fetchuser, getAllTasks); 
router.post("/createtask", fetchuser, createTask); 
router.put("/updatetask/:id", fetchuser, updateTask); 
router.delete("/deletetask/:id", fetchuser, deleteTask); 

export default router;
