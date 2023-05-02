import express from 'express'
import { addProduct, deleteProduct, editProduct, getAllProducts, getSingleProduct } from '../controllers/product.js'
import { isAuthenticated } from '../middleware/auth.js'
import { upload } from '../multer.js'

const router = express.Router()

router.get("/getproduct/:id", getSingleProduct)
router.get("/getallproducts", getAllProducts)
router.post("/addproduct", upload.single("file"), addProduct)
router.put("/editproduct/:id", isAuthenticated, editProduct)
router.delete("/deleteproduct/:id", isAuthenticated, deleteProduct)

export default router

