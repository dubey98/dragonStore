const Dragon = require("../models/dragon");

exports.index = function (req, res) {
  res.send("index not yet implemented yet");
};

exports.dragon_list = function (req, res) {
  res.send("all of them?");
};

exports.dragon_detail = function (req, res) {
  res.send("dragon not displayed yet" + req.params.id);
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
