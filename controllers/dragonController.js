const Dragon = require("../models/dragon");
const DragonCategory = require("../models/dragonCategory");
const Food = require("../models/food");

const async = require("async");
const validator = require("express-validator");
const dragon = require("../models/dragon");

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
  // get all categories and foods to let the user select from
  async.parallel(
    {
      categories: function (callback) {
        DragonCategory.find(callback);
      },
      foods: function (callback) {
        Food.find(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      res.render("dragon_form", {
        title: "Create Dragon",
        categories: results.categories,
        foods: results.foods,
      });
    }
  );
};

exports.create_dragon_post = [
  (req, res, next) => {
    if (!(req.body.food instanceof Array)) {
      if (typeof req.body.food === "undefined") req.body.food = [];
      else req.body.food = new Array(req.body.food);
    }
    next();
  },

  validator
    .body("name", "name of the dragon required")
    .trim()
    .isLength({ min: 1 }),
  validator
    .body("description", "description of the dragon required")
    .trim()
    .isLength({ min: 1 }),

  validator.sanitizeBody("name").escape(),
  validator.sanitizeBody("description").escape(),

  (req, res, next) => {
    const errors = validator.validationResult(req);

    let dragon = new Dragon({
      name: req.body.name,
      description: req.body.description,
      favfood: req.body.food,
      category: req.body.category,
    });

    if (req.body.weight) dragon.weight = req.body.weight;
    if (req.body.height) dragon.height = req.body.height;
    if (req.body.speed) dragon.speed = req.body.speed;
    if (req.body.population) dragon.population = req.body.population;

    if (!errors.isEmpty()) {
      async.parallel(
        {
          categories: function (callback) {
            DragonCategory.find(callback);
          },
          foods: function (callback) {
            Food.find(callback);
          },
        },
        function (err, results) {
          if (err) return next(err);
          for (let i = 0; i < results.foods.length; i++) {
            if (dragon.favfood.indexOf(results.foods[i]._id) > -1) {
              results.foods[i].checked = "true";
            }
          }
          res.render("dragon_form", {
            title: "Create Dragon",
            categories: results.categories,
            foods: results.foods,
            dragon: dragon,
            errors: errors.array(),
          });
          return;
        }
      );
    } else {
      dragon.save(function (err) {
        if (err) return next(err);
        res.redirect(dragon.url);
      });
    }
  },
];

exports.delete_dragon_get = function (req, res) {
  async.parallel(
    {
      dragon: function (callback) {
        Dragon.findById(req.params.id).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.dragon == null) res.redirect("/catalog/dragon_list/");
      res.render("dragon_delete", {
        title: "Delete Dragon",
        dragon: results.dragon,
      });
    }
  );
};

exports.delete_dragon_post = function (req, res) {
  Dragon.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.redirect("/catalog/dragon_list/");
  });
};

exports.update_dragon_get = function (req, res) {
  async.parallel(
    {
      dragon: function (callback) {
        Dragon.findById(req.params.id)
          .populate("category")
          .populate("favfood")
          .exec(callback);
      },
      foods: function (callback) {
        Food.find(callback);
      },
      categories: function (callback) {
        DragonCategory.find(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.dragon == null) {
        const error = new Error("Dragon is missing.");
        error.status = 404;
        return next(error);
      }
      for (let i = 0; i < results.foods.length; i++) {
        for (let j = 0; j < results.dragon.favfood.length; j++) {
          if (
            results.foods[i]._id.toString() ==
            results.dragon.favfood[j]._id.toString()
          ) {
            results.foods[i].checked = "true";
          }
        }
      }
      res.render("dragon_form", {
        title: "Update Dragon",
        categories: results.categories,
        dragon: results.dragon,
        foods: results.foods,
      });
    }
  );
};

exports.update_dragon_post = [
  (req, res, next) => {
    if (!(req.body.food instanceof Array)) {
      if (typeof req.body.food === "undefined") req.body.food = [];
      else req.body.food = new Array(req.body.food);
    }
    next();
  },

  validator
    .body("name", "name of the dragon required")
    .trim()
    .isLength({ min: 1 }),
  validator
    .body("description", "description of the dragon required")
    .trim()
    .isLength({ min: 1 }),

  validator.sanitizeBody("name").escape(),
  validator.sanitizeBody("description").escape(),

  (req, res, next) => {
    const errors = validator.validationResult(req);
    let dragon = new Dragon({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      favfood: req.body.food,
      category: req.body.category,
    });

    if (req.body.weight) dragon.weight = req.body.weight;
    if (req.body.height) dragon.height = req.body.height;
    if (req.body.speed) dragon.speed = req.body.speed;
    if (req.body.population) dragon.population = req.body.population;

    if (!errors.isEmpty()) {
      async.parallel(
        {
          categories: function (callback) {
            DragonCategory.find(callback);
          },
          foods: function (callback) {
            Food.find(callback);
          },
        },
        function (err, results) {
          if (err) return next(err);
          for (let i = 0; i < results.foods.length; i++) {
            if (dragon.favfood.indexOf(results.foods[i]._id) > -1) {
              results.foods[i].checked = "true";
            }
          }
          res.render("dragon_form", {
            title: "Update Dragon",
            categories: results.categories,
            foods: results.foods,
            dragon: dragon,
            errors: errors.array(),
          });
          return;
        }
      );
    } else {
      Dragon.findByIdAndUpdate(req.params.id, dragon, function (
        err,
        theDragon
      ) {
        if (err) return next(err);
        res.redirect(theDragon.url);
      });
    }
  },
];
