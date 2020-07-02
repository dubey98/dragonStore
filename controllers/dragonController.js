const Dragon = require("../models/dragon");
const DragonCategory = require("../models/dragonCategory");
const Food = require("../models/dragon");

const async = require("async");

exports.index = function (req, res) {
  async.parallel(
    {
      dragon_count: function (callback) {
        Dragon.countDocuments({}, callback);
      },
      category_count: function (callback) {
        DragonCategory.countDocuments({}, callback);
      },
      food_count: function (callback) {
        Food.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render("index", {
        title: "Welcome to dragon Store",
        err: err,
        data: results,
      });
    }
  );
};

exports.dragon_list = function (req, res) {
  Dragon.find({}, "name description category")
    .populate("category")
    .exec(function (err, list_dragons) {
      if (err) {
        return next(err);
      }
      res.render("dragon_list", {
        title: "All dragons",
        dragon_list: list_dragons,
      });
    });
};

exports.dragon_detail = function (req, res, next) {
  async.series(
    {
      dragon: function (callback) {
        Dragon.findById(req.params.id)
          .populate("favfood")
          .populate("category")
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results == null) {
        let error = new Error("Dragon is missing ");
        error.status = 404;
        return next(error);
      }
      res.render("dragon_detail", { dragon: results.dragon });
    }
  );
};

exports.create_dragon_get = function (req, res) {
  res.send("aa blah blah blah");
};

exports.create_dragon_post = function (req, res) {
  res.send("aa blah blah blah");
};

exports.delete_dragon_get = function (req, res) {
  res.send("why");
};

exports.delete_dragon_post = function (req, res) {
  res.send("why");
};

exports.update_dragon_get = function (req, res) {
  res.send("coming right up!");
};

exports.update_dragon_post = function (req, res) {
  res.send("coming right up!");
};
