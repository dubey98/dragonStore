const DragonCategory = require("../models/dragonCategory");
const Dragons = require("../models/dragon");

const async = require("async");

exports.category_list = function (req, res) {
  DragonCategory.find({}, "name").exec(function (err, list_category) {
    if (err) return next(err);
    res.render("category_list", {
      title: "All categories",
      category_list: list_category,
    });
  });
};

exports.category_detail = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        DragonCategory.findById(req.params.id).exec(callback);
      },
      dragons: function (callback) {
        Dragons.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.category == null) {
        let Err = new Error("category not found");
        Err.status = 404;
        return next(Err);
      }
      res.render("category_detail", {
        title: results.category.name,
        category: results.category,
        dragons: results.dragons,
      });
    }
  );
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
