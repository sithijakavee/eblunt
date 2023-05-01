import mongoose from "mongoose";
import Order from "../models/order.js";

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({})

        res.status(200).json({
            success: true,
            message: "All Orders",
            data: orders
        })
    } catch (error) {
        console.log(error)
    }
}