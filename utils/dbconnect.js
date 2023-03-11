const mongoose = require("mongoose");
module.exports.DBConnect = () => {
  mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Database connection successful");
  });
};
