const Food = require("../models/food");
const async = require("async");

exports.food_list = function (req, res) {
  food.find({}).exec(function (err, list_food) {
    if (err) {
      return next(err);
    }
    res.render("food_list", { title: "Food List", food_list: list_food });
  });
};

exports.food_detail = function (req, res, next) {
  async.parallel(
    {
      food: function (callback) {
        Food.findById(req.params.id).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results == null) {
        const error = new Error("Food not found");
        error.status = 404;
        return next(error);
      }
      res.render("food_detail", { food: results.food });
    }
  );
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
