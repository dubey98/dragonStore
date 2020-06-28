const food = require("../models/food");

exports.food_list = function (req, res) {
  res.send("coming right up");
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
