import mongoose from "mongoose";

const slideShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    image: {
        type: String,
        required: true,
        unique: false
    },

}, {timestamps: true})


const Slide =  mongoose.model("Slide", slideShema)
export default Slide