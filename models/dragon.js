const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dragonSchema = new Schema({
  name: { type: String, required: true, maxlength: 100, required: true },
  weight: { type: Number, min: 1 },
  height: { type: Number, min: 1 },
  speed: { type: Number, min: 1 },
  description: { type: String, min: 1, required: true },
  populaion: { type: Number, min: 1 },
  category: {
    type: Schema.Types.ObjectId,
    ref: "DragonCategory",
    required: true,
  },
  favfood: [{ type: Schema.Types.ObjectId, ref: "Food" }],
});

dragonSchema.virtual("url").get(function () {
  return "/catalog/dragon/" + this._id;
});

module.exports = mongoose.model("Dragon", dragonSchema);
