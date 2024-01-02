const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  anime: { type: Schema.Types.ObjectId, ref: "Anime" },
  manga: { type: Schema.Types.ObjectId, ref: "Manga" },
  character: { type: Schema.Types.ObjectId, ref: "Character" },
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
