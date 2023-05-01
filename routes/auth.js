import express from "express";
import {upload} from "../multer.js";
import { signin, signup, verifyToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", upload.single("file"), signup);
router.post("/login", signin);
router.post("/verify-token", verifyToken);

export default router;
