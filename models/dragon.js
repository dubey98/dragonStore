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
  favfood: [{ type: Schema.Types.ObjectId, ref: "Food", required: true }],
});

dragonSchema.virtual("lifespan").get(function () {
  return (
    this.date_of_birth.getYear() - this.date_of_death.getYear()
  ).toString();
});

dragonSchema.virtual("url").get(function () {
  return "/catalog/dragon" + this._id;
});

module.exports = mongoose.model("Dragon", dragonSchema);
