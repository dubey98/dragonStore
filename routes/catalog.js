const express = require("express");
const router = express.Router();

const dragonController = require("../controllers/dragonController");
const dragonCategoryController = require("../controllers/dragonCategoryController");
const foodController = require("../controllers/foodController");

/// dragon routes ///

router.get("/", dragonController.index);

router.get("/dragon_list", dragonController.dragon_list);

router.get("/dragon/create", dragonController.create_dragon_get);

router.post("/dragon/create", dragonController.create_dragon_post);

router.get("/dragon/:id/delete", dragonController.delete_dragon_get);

router.post("/dragon/:id/delete", dragonController.delete_dragon_post);

router.get("/dragon/:id/update", dragonController.update_dragon_post);

router.post("/dragon/:id/update", dragonController.update_dragon_post);

router.get("/dragon/:id", dragonController.dragon_detail);

//category routes

router.get("/category/", dragonCategoryController.category_list);

router.get("/category/create", dragonCategoryController.category_create_get);

router.post("/category/create", dragonCategoryController.category_create_get);

router.get(
  "/category/:id/delete",
  dragonCategoryController.category_delete_get
);

router.post(
  "/category/:id/delete",
  dragonCategoryController.category_delete_post
);

router.get(
  "/category/:id/update",
  dragonCategoryController.category_update_post
);

router.post(
  "/category/:id/update",
  dragonCategoryController.category_update_post
);

router.get("/category/:id", dragonCategoryController.category_detail);

//food routes

router.get("/food/", foodController.food_list);

router.get("/food/create", foodController.food_create_get);

router.post("/food/create", foodController.food_create_post);

router.get("/food/:id/delete", foodController.food_delete_get);

router.post("/food/:id/delete", foodController.food_delete_post);

router.get("/food/:id/update", foodController.food_update_post);

router.post("/food/:id/update", foodController.food_update_post);

router.get("/food/:id", foodController.food_detail);

module.exports = router;
