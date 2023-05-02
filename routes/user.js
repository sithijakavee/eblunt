import express from 'express'
import {isAuthenticated} from '../middleware/auth.js';
import { addtocart, deletecart, getUser } from '../controllers/user.js';


const router = express.Router()

router.get("/", (req, res) => {res.send("API") })
router.post("/getuser", isAuthenticated, getUser);
router.put("/addtocart", isAuthenticated, addtocart);
router.post("/deletecart", isAuthenticated, deletecart);

export default router