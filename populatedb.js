#! /usr/bin/env node

console.log(
  "Script for populating database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");
const Dragon = require("./models/dragon");
const DragonCategory = require("./models/dragonCategory");
const Food = require("./models/food");

const mongoose = require("mongoose");
const dragonCategory = require("./models/dragonCategory");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const dragons = [];
const dragonCategorys = [];
const foods = [];

function dragonCreate(
  name,
  weight,
  height,
  speed,
  description,
  population,
  category,
  favfood,
  cb
) {
  const dragonDetail = {
    name: name,
    category: category,
    favfood: favfood,
    description: description,
  };
  if (weight != false) dragonDetail.weight = weight;
  if (height != false) dragonDetail.height = height;
  if (speed != false) dragonDetail.speed = speed;
  if (population != false) dragonDetail.population = population;

  const dragon = new Dragon(dragonDetail);

  dragon.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Dragon : " + dragon);
    dragons.push(dragon);
    cb(null, dragon);
  });
}

function categoryCreate(name, description, cb) {
  const categoryDetail = { name: name, description: description };

  const dragonCategory = new DragonCategory(categoryDetail);

  dragonCategory.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("new dragon category : " + dragonCategory);
    dragonCategorys.push(dragonCategory);
    cb(null, dragonCategory);
  });
}

function foodCreate(name, description, cb) {
  const food_detail = {
    name: name,
    description: description,
  };

  const foodinstance = new Food(food_detail);
  foodinstance.save(function (err) {
    if (err) {
      console.log("ERROR CREATING foodinstance: " + foodinstance);
      cb(err, null);
      return;
    }
    console.log("New FoodInstance: " + foodinstance);
    foods.push(foodinstance);
    cb(null, foodinstance);
  });
}

function createFoodCategory(cb) {
  async.series(
    [
      function (callback) {
        foodCreate("chicken", "the one that does puck!!puck!!", callback);
      },
      function (callback) {
        foodCreate("human", "the weaklings", callback);
      },
      function (callback) {
        foodCreate("sheeps", "too much work clean up gets messy", callback);
      },
      function (callback) {
        foodCreate(
          "tortoise",
          "hard to crack but very delicious inside ",
          callback
        );
      },
      function (callback) {
        foodCreate("Rocks", "delicious once you make them liquid", callback);
      },
      function (callback) {
        foodCreate(
          "earth",
          "salty and earthlike though if you can find,there are great flavours",
          callback
        );
      },
      function (callback) {
        foodCreate(
          "fish",
          "take a dive in the icy cold water and find a gem!!",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Stoker Class Dragons",
          "Stoker Class dragons are hot-headed fire breathers. This class includes dragons that can set themselves on fire, as well as most of the smaller dragon species. A Stoker Class dragon losing its fire is a sign that it is going to die, although its flames can be reignited by a Fireworm Queens venom or by eating their Flame Gel combs. ",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Boulder Class",
          "Boulder Class dragons are tough dragons and are associated with the earth. They can eat rocks, and although they have small wings relative to their body size, they are able to fly as fast and as high as most other dragons can.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Tracker Class ",
          "The Tracker Class is a new class discovered in Race to the Edge. The symbol of this class reuses the Fear Class symbol, despite the Hideous Zippleback not belonging to this Class. Natural born hunters, Tracker Class dragons have a highly acute sense of smell or taste that enables them to track down and find things.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Sharp Class ",
          "Sharp Class dragons are vain and prideful species, and they all possess sharp body parts.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Tidal Class ",
          "Tidal Class dragons live in or near the ocean, and unlike most dragons, they do not breathe fire as their ranged attacks, and although very few can, they rarely do use them. The dragons in this class are generally larger in size than most of the other classes. Hiccup also stated that Tidal Class dragons don't react well to signs of aggression.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Mystery Class",
          "Little is known about the Mystery Class dragons due to how stealthy and sneaky they are. Dragons in this class are generally more feared than those in the other dragon classes.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Strike Class",
          "Strike Class dragons are characterized by their blazing speed, vice-like jaw strength, and extreme intelligence, as well as pinpoint accuracy, powerful attacks, explosive firepower and a unique ability to allow them to navigate in their respective environments/atmosphere. The dragons in this class are some of the rarest of all dragons, and some are close to extinction. They are also the most difficult to train but the most loyal once they have been trained, they are also generally among the most powerful dragons.",
          callback
        );
      },
    ],
    cb
  );
}

function createDragons(cb) {
  async.parallel(
    [
      function (callback) {
        dragonCreate(
          "NIght Fury",
          200,
          30,
          1000,
          "extremely rare, stealthy and intelligent, dangerous for human approach, nobody has seen one",
          1,
          dragonCategorys[6],
          [foods[0], foods[2]],
          callback
        );
      },
      function (callback) {
        dragonCreate(
          "Monstrous Nightmare",
          100,
          10,
          50,
          "imagine a monster, than imagine him lit on fire, flying towards you...yep that him.",
          false,
          dragonCategorys[0],
          [foods[0], foods[3]],
          callback
        );
      },
      function (callback) {
        dragonCreate(
          "Red death",
          150,
          15,
          100,
          "a Hot head , can lit himself on fire, fiery red glaze",
          45800,
          dragonCategorys[1],
          [foods[2], foods[4]],
          callback
        );
      },
      function (callback) {
        dragonCreate(
          "Gronckle",
          400,
          40,
          500,
          "dont let the size fool you, these are fast and tough ones.",
          150000,
          dragonCategorys[1],
          [foods[6], foods[5]],
          callback
        );
      },
      function (callback) {
        dragonCreate(
          "Sentinel",
          300,
          40,
          100,
          "tough one, can eat rocks and can fly for sure",
          10000,
          dragonCategorys[6],
          [foods[5], foods[6], foods[3]],
          callback
        );
      },
      function (callback) {
        dragonCreate(
          "RumbleHorm",
          100,
          10,
          600,
          "these are natural born hunters, with advanced tracking skills",
          500,
          dragonCategorys[2],
          [foods[5], foods[3]],
          callback
        );
      },
      function (callback) {
        dragonCreate(
          "Thunderdrum",
          1000,
          100,
          200,
          "huge dragons that live in the ocean, can trael fast underwater",
          10,
          dragonCategorys[4],
          [foods[2], foods[4], foods[5]],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createFoodCategory, createDragons],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Dragons : " + dragons);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
