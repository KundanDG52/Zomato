const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
  type: { type: String },
});

const Category = mongoose.model("category", categoryModel);
module.exports = Category;
