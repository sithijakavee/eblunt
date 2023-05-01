import express from "express";
import User from "../models/user.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Access denied!",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const addtocart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.cartItems.includes(req.body.productid)) {
      res.status(409).json({
        success: false,
        message: "Product already in cart!",
      });
    } else {
      await User.findByIdAndUpdate(req.user._id, {
        $push: { cartItems: req.body.productid },
      }).then((newItem, err) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).json({
            success: true,
            message: "Item added to cart successfully!",
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    next;
  }
};

export const deletecart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { cartItems: req.body.productid },
    }).then((newItem, err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).json({
          success: true,
          message: "Item removed successfully!",
        });
      }
    });
  } catch (error) {
    console.log(error);
    next;
  }
};
