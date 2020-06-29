const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String, minlength: 3, required: true },
  description: { type: String, minlength: 1, required: true },
});

foodSchema.virtual("url").get(function () {
  return "/catalog/food/" + this._id;
});

module.exports = mongoose.model("Food", foodSchema);
