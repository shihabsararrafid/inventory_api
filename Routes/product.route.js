const express = require("express");
const productController = require("./../controllers/product.controller");
const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProducts);
productRouter.route("/bulk-update").patch(productController.updateBulkProducts);
productRouter
  .route("/bulk-delete")
  .delete(productController.deleteBulkProducts);
productRouter
  .route("/:id")
  .get(productController.getSingleProduct)
  .patch(productController.updateSingleProductById)
  .delete(productController.deleteSingleProductById);

module.exports = productRouter;
