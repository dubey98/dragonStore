const food = require("../models/food");
const { nextTick } = require("async");

exports.food_list = function (req, res) {
  food.find({}).exec(function (err, list_food) {
    if (err) {
      return next(err);
    }
    res.render("food_list", { title: "Food List", food_list: list_food });
  });
};

exports.food_detail = function (req, res) {
  res.send("eat it!");
};

exports.food_create_get = function (req, res) {
  res.send("preparations....");
};

exports.food_create_post = function (req, res) {
  res.send("cooked ");
};

exports.food_delete_get = function (req, res) {
  res.send("preparations....");
};

exports.food_delete_post = function (req, res) {
  res.send("cooked ");
};

exports.food_update_get = function (req, res) {
  res.send("preparations....");
};

exports.food_update_post = function (req, res) {
  res.send("cooked ");
};
