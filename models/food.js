const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String, minlength: 3 },
  description: { type: String, minlength: 1 },
});

foodSchema.virtual("url").get(function () {
  return "/catalog/food/" + this._id;
});

module.exports = mongoose.model("Food", foodSchema);
