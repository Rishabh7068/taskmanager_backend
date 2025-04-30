import mongoose from 'mongoose'
const { Schema } = mongoose;



const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required :true,
        unique : true
    },

    password :{
        type : String,
        required :true
    },
    date:{
        type : Date,
        default :Date.now
    },
    otp:{
        type : String
    },
    otpExpires:{
        type : Date
    },
    emailVerified: { 
        type: Boolean, 
        default: false 
    },
});

export default mongoose.model("user", UserSchema);

  