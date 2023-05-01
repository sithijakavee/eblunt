import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    image: {
        type: String,
        default: "",
        required: false,
        unique: false
    },
    cartItems: {
        type: [String],
        default: [],
    },
    status: {
        type: String,
        required: false,
        default: "client"
    }
}, {timestamps: true})


const User =  mongoose.model("User", userShema)
export default User