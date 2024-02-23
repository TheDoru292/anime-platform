const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  anime: { type: Schema.Types.ObjectId, ref: "Anime" },
  manga: { type: Schema.Types.ObjectId, ref: "Manga" },
  review: { type: String },
  recommended: { type: String, required: true },
  reviewed_on: { type: Date, required: true },
});

module.exports = mongoose.model("Review", ReviewSchema);
