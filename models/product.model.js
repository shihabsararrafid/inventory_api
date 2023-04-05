const mongoose = require("mongoose");
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

// we can use middle ware in mongoose too in the save method  there is two middleware predefined in the mongoose one is pre and another is post; pre is called before the calling of save method and post is called after the save method
// middleware must be declare before the declaration of model

// using  the pre middleware

productSchema.pre("save", function (next) {
  console.log("Calling before save");
  next();
});

productSchema.post("save", function (doc, next) {
  console.log("after calling save");
  next();
});
productSchema.methods.logger = function () {
  console.log(` function called for ${this.name}`);
};
// SCHEMA -> MODEL -> Query
// creating models
// here mongoose model function takes two parameters one is the name of the model and another is the schema
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
