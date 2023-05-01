import mongoose from "mongoose";

export function connect(){
    mongoose.connect(process.env.MONGO_URL).then((res) => {
        console.log("Database connected")
    }).catch((err) => {
        console.log(err)
    })
}