const Food = require("../models/food");

const async = require("async");
const validator = require("express-validator");

exports.food_list = function (req, res) {
  Food.find({}).exec(function (err, list_food) {
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
  res.render("food_form", { title: "Create Food" });
};

exports.food_create_post = [
  validator.body("name", "Food name required").trim().isLength({ min: 1 }),
  validator.body("name", "description is required").trim().isLength({ min: 1 }),

  validator.sanitizeBody("name").escape(),
  validator.sanitizeBody("description").escape(),

  (req, res, next) => {
    const errors = validator.validationResult(req);
    let food = new Food({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("food_form", {
        title: "Create Food again",
        food: food,
        errors: errors.array(),
      });
    } else {
      Food.findOne({ name: req.body.name }).exec(function (err, found_food) {
        if (err) return next(err);
        if (found_food) {
          res.redirect(found_food.url);
        } else {
          food.save(function (err) {
            if (err) return next(err);
            res.redirect(food.url);
          });
        }
      });
    }
  },
];

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
