const express = require("express");
const app = express();
app.use(express.json());
const shoppingcart = require("./shopcartroute");
app.listen(3000, console.log("listening3000"));
app.use("/cart-items/", shoppingcart);