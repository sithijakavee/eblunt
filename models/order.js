import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    products: {
        type: [{
           
        }],
        required: true
    },
    total: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    address1:{
        type: String,
        required: true,
    },
    address2:{
        type: String,
        required: true,
    },
    postalcode:{
        type: String,
        required: true,
    },
    street:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    info:{
        type: String,
        required: false,
        default: "",
    },
    status:{
        type: String,
        required: false,
        default: "pending",
    },
    
    
}, {timestamps: true})

const Order = mongoose.model("Order", orderSchema)
export default Order