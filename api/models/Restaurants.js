const mongoose = require("mongoose");

const RestaurantsModel = new mongoose.Schema({
  name: { type: String, default: null },
  address: { type: String, default: null },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId },
      text: { type: String },
    },
  ],
  timing: { type: String, default: "9.00AM - 10.00PM" },
  menu: [
    {
      category: { type: String },
      categoryitems: [
        {
          item: { type: String },
          price: { type: String },
          veg: { type: Boolean, default: true },
        },
      ],
    },
  ],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
});

const Restaurants = mongoose.model("Restaurants", RestaurantsModel);
module.exports = Restaurants;
