import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import { createError } from "../err.js";
import { verify } from "../utils/verifyToken.js";

export const signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });

      res.status(403).json({
        success: false,
        message: "Email already in used! Try with another one.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
      image: req.file.filename,
    });

    await newUser.save();

    const { password, ...others } = newUser;
    res.status(201).json({
      success: true,
      message: "Account created successfully!",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(401).json({
        success: false,
        message: "Wrong credentials!",
      });

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect)
      return res.status(401).json({
        success: false,
        message: "Wrong credentials!",
      });
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        cart: user.cartItems,
      },
      process.env.JWT
    );

    const { password, ...others } = user._doc;

    res
      .status(200)
      .json({
        success: true,
        message: "Login success!",
        data: { ...others, access_token: token },
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const token = verify(req, res, next);
    if (token) {
      console.log(token);
      res.status(200).json({
        success: true,
        message: "Token verified!",
        data: req.user,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Token expired!",
        data: req.user,
      });
    }
  } catch (error) {}
};
