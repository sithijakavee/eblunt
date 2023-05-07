import mongoose from "mongoose";

const aboutShema = new mongoose.Schema({
    about: {
        type: String,
        required: true,
        unique: false
    }
}, {timestamps: true})


const About =  mongoose.model("About", aboutShema)
export default About