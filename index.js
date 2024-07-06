const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

//Server-side values
const taxRate = 5;
const discountPercentage = 10;
const loyaltyRate = 2;

//Calculate the total price of items in the cart
function totalCartValue(newItemPrice, cartTotal) {
  let totalCartPrice = newItemPrice + cartTotal;
  return totalCartPrice.toString();
}
app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(totalCartValue(newItemPrice, cartTotal));
});

//Apply a discount based on membership status
function applyDiscount(cartTotal, isMember) {
  let discountPrice = cartTotal - (cartTotal * discountPercentage) / 100;
  if (isMember === "true") {
    return discountPrice.toString();
  } else {
    return cartTotal.toString();
  }
}
app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(applyDiscount(cartTotal, isMember));
});

//Calculate tax on the cart total
function applyTax(cartTotal) {
  let cartAmount = (cartTotal * taxRate) / 100;
  return cartAmount.toString();
}
app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(applyTax(cartTotal));
});

//Estimate delivery time based on shipping method
function estimateDelivery(shippingMethod, distance) {
  let deliveryTime;
  if (shippingMethod === "standard") {
    deliveryTime = distance / 50; // 1 day per 50kms
    return deliveryTime.toString();
  } else if (shippingMethod === "express") {
    deliveryTime = distance / 100; // 1 day per 100kms
    return deliveryTime.toString();
  }
}
app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(estimateDelivery(shippingMethod, distance));
});

//Calculate the shipping cost based on weight and distance
function shippingCost(weight, distance) {
  let resultCost = weight * distance * 0.1;
  return resultCost.toString();
}
app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(shippingCost(weight, distance));
});

//Calculate loyalty points earned from a purchase
function calculateLoyalty(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  return loyaltyPoints.toString();
}
app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyalty(purchaseAmount));
});

let PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
