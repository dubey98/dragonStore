const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dragonCategory = new Schema({
  name: { type: String, minlength: 1 },
  description: { type: String, minlength: 1 },
});

dragonCategory.virtual("url").get(function () {
  return "/catalog/category/" + this._id;
});

module.exports = mongoose.model("DragonCategory", dragonCategory);
