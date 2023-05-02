import mongoose from "mongoose";
import Product from "../models/product.js";

export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json({
        success: true,
        message: "Product Found",
        data: product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not Found",
        data: product,
      });
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    if (products) {
      return res.status(200).json({
        success: true,
        data: products,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    console.log(req.file);
    const newProduct = new Product({
      ...req.body,
      image: req.file.filename,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "New Product Added Successfully!",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const editProduct = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const deleteProduct = async (req, res, next) => {
  try {
  } catch (error) {}
};
