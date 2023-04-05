const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const productRoute = require("./Routes/product.route");
app.use(express.json());
app.use(cors());

// can create methods in mongoose
app.use("/api/v1/product", productRoute);
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
