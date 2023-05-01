import mongoose from "mongoose";

const videoShema = new mongoose.Schema({
    video: {
        type: String,
        required: true,
        unique: false
    }
}, {timestamps: true})


const Video =  mongoose.model("Video", videoShema)
export default Video