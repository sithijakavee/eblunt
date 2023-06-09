import express from 'express'
import {isAuthenticated} from '../middleware/auth.js';
import { addAbout, addSlide, deleteSlide, getAbout, getSlides, getVideo, uploadVideo } from '../controllers/ui.js';
import { upload } from '../multer.js';


const router = express.Router()


router.post("/video", isAuthenticated, uploadVideo);
router.get("/video", getVideo);
router.post("/slides/add", upload.single("file"), addSlide);
router.get("/slides", getSlides);
router.post("/slides/delete", isAuthenticated, deleteSlide);
router.post("/about", isAuthenticated, addAbout);
router.get("/about/get", getAbout);

export default router