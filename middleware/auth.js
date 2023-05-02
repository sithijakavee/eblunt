import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { access_token } = req.body;

    console.log(req.body);

    if (!access_token) {
      res.status(401).json({
        success: false,
        message: "Pls Login to get this service.",
      });
    }

    const decoded = jwt.verify(access_token, process.env.JWT);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    if(error.name === "JsonWebTokenError"){
      console.log("ERROE****",error)
      return({
        success: false,
        message: "Invalid token"
      })
    }
    else{
      console.log(error)
      next()
    }
  }

};
