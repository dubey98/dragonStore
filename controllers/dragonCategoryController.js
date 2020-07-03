const DragonCategory = require("../models/dragonCategory");
const Dragons = require("../models/dragon");

const async = require("async");
const validator = require("express-validator");

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
  res.render("category_create", { title: "Create category" });
};

exports.category_create_post = [
  validator.body("name", "name is required").trim().isLength({ min: 1 }),

  validator.sanitizeBody("name").escape(),
  validator.sanitizeBody("description").escape(),

  (req, res, next) => {
    const errors = validator.validationResult(req);

    let category = new DragonCategory({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("category_create", {
        title: "Create Category",
        error: errors.array(),
        category: category,
      });
    } else {
      DragonCategory.findOne({ name: req.body.name }).exec(function (
        err,
        found_category
      ) {
        if (err) return next(err);
        if (found_category) {
          res.redirect(found_category.url);
        } else {
          category.save(function (err) {
            if (err) return next(err);
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

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
