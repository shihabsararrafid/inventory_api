const Product = require("../models/product.model");
const {
  getServiceProduct,
  createServiceProduct,
  getSingleServiceProduct,
  updateSingleServiceProduct,
  updateBulkServiceProduct,
  deleteSingleProductServiceById,
  deleteBulkServiceProduct,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await getServiceProduct();
    res.status(200).json({
      status: "Success",
      message: "Data loaded successfully",
      result: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "fail to save the data",
      error: error.message,
    });
  }
};

exports.createProducts = async (req, res, next) => {
  // for saving there is two options in mongoose
  /***
   * One is to use save by creating an instance
   * Another is to create without creating an instance
   */
  //console.log({ Product });
  try {
    const product = createServiceProduct();
    if (product.quantity === 0) {
      product.status = "out-of-stock";
    }
    const result = await product.save();
    result.logger();
    console.log(" data is saving");
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
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getSingleServiceProduct(id);
    res.status(200).json({
      status: "Success",
      message: "Successfully load the data",
      result: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "fail to load the data",
      error: error.message,
    });
  }
};

exports.updateSingleProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateSingleServiceProduct(id, req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully update the data",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "fail to update the data",
      error: error.message,
    });
  }
};

exports.updateBulkProducts = async (req, res, next) => {
  //const { id } = req.params;
  try {
    const result = await updateBulkServiceProduct(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully update the data",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "fail to update the data",
      error: error.message,
    });
  }
};

exports.deleteSingleProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await deleteSingleProductServiceById(id);
    res.status(200).json({
      status: "Success",
      message: "Successfully delete  the data",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "fail to delete the data",
      error: error.message,
    });
  }
};

exports.deleteBulkProducts = async (req, res, next) => {
  //const { id } = req.params;
  try {
    const result = await deleteBulkServiceProduct(req.body.ids);
    res.status(200).json({
      status: "Success",
      message: "Successfully update the data",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "fail to update the data",
      error: error.message,
    });
  }
};
