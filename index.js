import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import productRoutes from "./routes/product.js"
import checkoutRoutes from "./routes/checkout.js"
import orderRoutes from "./routes/order.js"
import uiRoutes from "./routes/ui.js"
import {connect} from "./db/connect.js"
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://eblunt-8673d.web.app",
    credentials: true,
}))
app.use(express.json({
    verify: (req, res, buf) => {
        const url = req.originalUrl
        if (url.startsWith("/webhooks")) {
            req.rawBody = buf.toString()
        }
    }
}))
app.use(express.static("./uploads"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user/", userRoutes)
app.use("/api/v1/auth/", authRoutes)
app.use("/api/v1/product/", productRoutes)
app.use("/api/v1/checkout/", checkoutRoutes)
app.use("/api/v1/orders/", orderRoutes)
app.use("/api/v1/ui/", uiRoutes)

app.listen(process.env.PORT || 5000, () => {
    connect()
    console.log("Server is listening")
})