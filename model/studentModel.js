import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true,
    }, 
    studentCode : { 
        type : String, 
        required : true,
    },
    isActive : { 
        type : Boolean, 
        required : true,
    },
})

const Student = mongoose.model("Student",studentSchema, "Student");

export default Student;