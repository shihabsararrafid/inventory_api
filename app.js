const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      unique: [true, "Product name must be unique"],
      minLength: [3, "Name Must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price Can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) return true;
          else return false;
        },
        message: "Quantity must be an integer",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["In-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },

    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },{
  },
  {
    timestamps: true,
  }
);
// SCHEMA -> MODEL -> Query
// creating models
// here mongoose model function takes two parameters one is the name of the model and another is the schema
const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
//creating post request
app.post("/api/v1/product", async (req, res, next) => {
  // for saving there is two options in mongoose
  /***
   * One is to use save by creating an instance
   * Another is to create without creating an instance
   */
  //console.log({ Product });
  try {
    const product = new Product(req.body);
    if (product.quantity === 0) {
      product.status = "out-of-stock";
    }
    const result = await product.save();
    console.log(result);
    // console.log(req.body);
    res.status(200).json({
      status: "Success",
      message: "Data saved successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "fail to save the data",
      error: error.message,
    });
  }
});

module.exports = app;
