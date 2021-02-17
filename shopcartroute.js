const express = require("express");
const shoppingcart = express.Router();

const cartItems = [
    {id: 1, product: "matcha", price: 7.99, quantity: 2},
    {id: 2, product: "kombucha", price: 3.82, quantity: 4},
    {id: 3, product: "cheese", price: 6.75, quantity: 1},
]

// GET /cart-items
shoppingcart.get("/", (req, res) => {
    let filteredItems = cartItems;
    let maxPrice = parseFloat(req.query.maxPrice);
    if(maxPrice){
        filteredItems = cartItems.filter(i => i.price <= maxPrice)
    }
    if(req.query.prefix){
        filteredItems = cartItems.filter(i => i.product.startsWith(req.query.prefix))
    }
    let pageSize = parseInt(req.query.pageSize);
    if(pageSize){
        filteredItems = cartItems.slice(0, pageSize)
    }
    res.json(filteredItems);
}
)
// testing queries have /? 
// open it up & look online http://localhost:3000/cart-items/
// test maxPrice http://localhost:3000/cart-items/?maxPrice=5
// change price depending on price
// test prefix http://localhost:3000/cart-items/?prefix=m
// change prefix letter depending on product name
// parseFloat has decimal
// parseInt is whole number
// test how many items are in cart http://localhost:3000/cart-items/?pageSize=2
// 0 is falsey in js, which is why cart item 0 returned all items


shoppingcart.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = cartItems.find(i => i.id === id);
    if (!item){
        res.status(404).send("Error - No item found!")
    }
    res.json(item);
}
)
// to test online http://localhost:3000/cart-items/3
// change id by change # after /

// NEXT ONES NEED TO USE POSTMAN
shoppingcart.post("/", (req, res) => {
    let item = req.body;
    item.id = cartItems.length + 1;
    cartItems.push(req.body);
    res.status(201).json(cartItems);
  });
  
shoppingcart.put("/:id", (req, res) => {
    const index = cartList.findIndex((item) => {
        return item.id === parseInt(req.params.id);
    });
    cartList.splice(index, 1, req.body);
    res.status(200).json(cartItems);
  });
  
shoppingcart.delete("/:id", (req, res) => {
    const deleteIndex = cartItems.findIndex((item) => {
        return item.id === parseInt(req.params.id);
    });
    cartItems.splice(deleteIndex, 1);
    res.status(204).json(cartItems);
  });

// MOSH VIDEO
// FIND TIIA's PRACTICE EXPRESS LAB

module.exports = shoppingcart;