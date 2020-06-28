const express = require("express");
const router = express.Router();

const dragonController = require("../controllers/dragonController");
const dragonCategoryController = require("../controllers/dragonCategoryController");
const foodController = require("../controllers/foodCOntroller");

/// dragon routes ///

//home page
router.get("/", dragonController.index);

//dragon page

module.exports = router;
