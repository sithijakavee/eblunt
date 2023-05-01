import express from "express";
import { checkout, root, webhook } from "../controllers/checkout.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/", root)
router.post("/checkout", isAuthenticated, checkout);
router.post("/webhooks", webhook);

export default router;
