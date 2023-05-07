import About from "../models/about.js"
import Slide from "../models/slide.js"
import Video from "../models/video.js"

export const uploadVideo = async (req, res, next) => {
    try {

        await Video.deleteMany({})
        const video = await Video.create({video: req.body.video})

        res.status(201).json({
            success: true,
            message: "Video uploaded sucessfully",
            data: video
        })
    } catch (error) {
        console.log(error)
    }
}

export const getVideo = async (req, res, next) => {
    try {

        const video = await Video.find({})
        console.log(video)

        const u = video[0].video.split("/")
        const url = "https://youtube.com/embed/" + u[u.length - 1]
        console.log(url)

        res.status(201).json({
            success: true,
            message: "Video uploaded sucessfully",
            data: url
        })
    } catch (error) {
        console.log(error)
    }
}

export const addSlide = async (req, res, next) => {
    try {
        const slide = await Slide.create({...req.body, image: req.file.filename})

        res.status(201).json({
            success: true,
            message: "Slide created sucessfully",
            data: slide
        })
    } catch (error) {
        console.log(error)
    }
}


export const getSlides = async (req, res, next) => {
    try {
        const slides = await Slide.find({})

        res.status(201).json({
            success: true,
            data: slides
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteSlide = async (req, res, next) => {
    try {
        const slides = await Slide.findByIdAndDelete(req.body.id)

        res.status(201).json({
            success: true,
            message: "Slide deleted successfully!"
        })
    } catch (error) {
        console.log(error)
    }
}


export const addAbout = async (req, res, next) => {
    try {
        await About.deleteMany({})

        const about = await About.create({about: req.body.about})

        res.status(201).json({
            success: true,
            message: "About uploaded sucessfully",
            data: about
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAbout = async (req, res, next) => {
    try {

        const about = await About.find({})
        console.log(about)
        res.status(201).json({
            success: true,
            data: about
        })
    } catch (error) {
        console.log(error)
    }
}