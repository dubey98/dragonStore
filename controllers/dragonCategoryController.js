const DragonCategory = require("../models/dragonCategory");

exports.category_list = function (req, res) {
  res.send("coming right up");
};

exports.category_detail = function (req, res) {
  res.send("you are a curious one");
};

exports.category_create_get = function (req, res) {
  res.send("cooking");
};

exports.category_create_post = function (req, res) {
  res.send("almost done");
};

exports.category_delete_get = function (req, res) {
  res.send("entire thing ");
};

exports.category_delete_post = function (req, res) {
  res.send("deleting it !");
};

exports.category_update_get = function (req, res) {
  res.send("entire thing ");
};

exports.category_update_post = function (req, res) {
  res.send("deleting it !");
};
