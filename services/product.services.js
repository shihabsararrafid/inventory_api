const Product = require("../models/product.model");

exports.getServiceProduct = async () => {
  const products = await Product.find();
  return products;
};

exports.getSingleServiceProduct = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};

exports.updateSingleServiceProduct = async (productId, data) => {
  const product = await Product.findById(productId);
  const result = product.set(data).save();
  //   const product = await Product.updateOne({
  //     _id: productId,
  //     $set: data,
  //     runValidators: true,
  //   });
  return result;
};

exports.createServiceProduct = async (data) => {
  const products = new Product(data);
  return products;
};


exports.updateBulkServiceProduct = async(data)=>{
  const result = await Product.updateMany({_id:data.ids},data.data,{
    runValidators:true
  })
  return result;
}