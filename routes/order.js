import express from 'express'
import {isAuthenticated} from '../middleware/auth.js';
import { getAllOrders } from '../controllers/order.js';


const router = express.Router()


router.post("/getallorders", isAuthenticated, getAllOrders);

export default router