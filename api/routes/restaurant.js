const express = require("express");
const { deleteOne } = require("../models/Restaurants");
const router = express.Router();
const Restaurants = require("../models/Restaurants");
router.post("/", async (req, res) => {
  const { name, address, timing, menu, category } = req.body;
  const newRestaurant = Restaurants();
  newRestaurant.name = name;
  newRestaurant.address = address;
  newRestaurant.timing = timing;
  newRestaurant.menu = menu;
  newRestaurant.category = category;
  try {
    await newRestaurant.save();
    res.status(201).send("New Restaurant created Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    let AllRestaurants = await Restaurants.find().populate("category");
    res.status(200).send(AllRestaurants);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/editrestaurant", async (req, res) => {
  const { restaurantId, update } = req.body;
  try {
    let OneRestaurants = await Restaurants.findOne({ _id: restaurantId });
    for (const keys in update) {
      /*   keys="price"
            item["price"]=update["prices"] */
      OneRestaurants[keys] = update[keys];
    }
    await OneRestaurants.save();
    res.status(200).send("Restaurants Details updated");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/", async (req, res) => {
  const { restaurantId } = req.body;
  try {
    let AllRestaurants = await Restaurants.deleteOne({ _id: restaurantId });
    res.status(200).send("Restaurant Deleted Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/addItem", async (req, res) => {
  const { RestaurantsId, CategoryId, newItem } = req.body;
  try {
    let OneRestaurant = await Restaurants.findOne({ _id: RestaurantsId });
    OneRestaurant.menu.forEach((element) => {
      if (element.id === CategoryId) {
        element.categoryitems.push(newItem);
      }
    });
    await OneRestaurant.save();

    res.status(200).send("New Item Added Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/updateItem", async (req, res) => {
  const { RestaurantsId, CategoryId, ItemId, update } = req.body;
  try {
    let OneRestaurant = await Restaurants.findOne({ _id: RestaurantsId });
    OneRestaurant.menu.forEach((element) => {
      if (element.id === CategoryId) {
        element.categoryitems.forEach((item) => {
          if (item.id === ItemId) {
            for (const keys in update) {
              /*   keys="price"
                    item["price"]=update["prices"] */
              item[keys] = update[keys];
            }
          }
        });
      }
    });
    await OneRestaurant.save();

    res.status(200).send("New Item Added Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/deleteItem", async (req, res) => {
  const { RestaurantsId, CategoryId, ItemId } = req.body;
  try {
    let OneRestaurant = await Restaurants.findOne({
      _id: RestaurantsId,
    }).populate("catagory");
    OneRestaurant.menu.forEach((element) => {
      if (element.id === CategoryId) {
        element.categoryitems = element.categoryitems.filter(
          (item) => item.id !== ItemId
        );
      }
    });
    await OneRestaurant.save();
    res.status(200).send("Item removed from Menu Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
