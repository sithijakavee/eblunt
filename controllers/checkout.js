import mongoose from "mongoose";
import coinbase from "coinbase-commerce-node";
import Order from "../models/order.js";

export const root = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Succees",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
export const checkout = async (req, res, next) => {
  var Client = coinbase.Client;
  var resources = coinbase.resources;
  var Webhook = coinbase.Webhook;

  Client.init("bd7252b1-742e-4ebd-aee6-a1aacdc74ae5");

  const {
    products,
    total,
    fullname,
    email,
    phone,
    address1,
    address2,
    country,
    city,
    postalcode,
    info,
  } = req.body;

  const data = { ...req.body, userid: req.user._id };

  try {
    const newOrder = await Order.create(data);
    console.log(newOrder);

    if (newOrder) {
      try {
        const charge = await resources.Charge.create({
          name: "E-blunt",
          description: "Thanks for shopping with eblunt",
          local_price: {
            amount: total,
            currency: "USD",
          },
          pricing_type: "fixed_price",
          metadata: {
            orderid: newOrder._id,
            userid: req.user._id,
            fulname: fullname,
            email: email,
            phone: phone,
            address1: address1,
            address2: address2,
            country: country,
            city: city,
            postalCode: postalcode,
            info: info,
          },
        });

        res.status(200).json({
          charge: charge,
          url: charge.hosted_url,
        });
      } catch (error) {
        console.log("My Error: ", error);
        res.status(500).json({
          error: error,
        });
        next();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const webhook = async (req, res, next) => {
  var Client = coinbase.Client;
  var resources = coinbase.resources;
  var Webhook = coinbase.Webhook;
  const event = Webhook.verifyEventBody(
    req.rawBody,
    req.headers["x-cc-webhook-signature"],
    "6056c8e2-61cf-4426-b76d-3e8beda7a9ef"
  );

  if (event.type === "charge:confirmed") {
    let amount = event.data.pricing.local.amount;
    let currency = event.data.pricing.local.currency;
    let userid = event.data.metadata.userid;

    console.log(amount, currency, userid);

    await Order.findByIdAndUpdate(event.data.metadata.orderid, {status: "confirmed"})
  }

  if (event.type === "charge:created") {
    console.log("created");
    await Order.findByIdAndUpdate(event.data.metadata.orderid, {status: "created"})
  }
  if (event.type === "charge:delayed") {
    console.log("delayed");
    await Order.findByIdAndUpdate(event.data.metadata.orderid, {status: "delayed"})
  }
  if (event.type === "charge:failed") {
    console.log("failed");
    await Order.findByIdAndUpdate(event.data.metadata.orderid, {status: "failed"})
  }
  if (event.type === "charge:pending") {
    console.log("Pending");
    await Order.findByIdAndUpdate(event.data.metadata.orderid, {status: "pending"})
  }

  if (event.type === "charge:resolved") {
    console.log("Resolved");
    await Order.findByIdAndUpdate(event.data.metadata.orderid, {status: "resolved"})
  }
};
