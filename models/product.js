import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
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
        type: [String],
        required: false,
        default: []
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    sold: {
        type: Number,
        required: false,
        default: 0
    }
})

const Product = mongoose.model("Product", productSchema)
export default Product