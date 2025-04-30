import mongoose from 'mongoose'
const { Schema } = mongoose;

const taskSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    status:{
        type: String,
        default: "pending",
        enum: ["pending", "completed" , "in-progress"]
    },
    duedate:{
        type: Date,
        required: true  
    },
    date:{
        type: Date,
        default: Date.now
    },
});


export default mongoose.model("task", taskSchema);


  