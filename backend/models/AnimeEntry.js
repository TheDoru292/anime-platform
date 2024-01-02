const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimeEntrySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  anime: { type: Schema.Types.ObjectId, ref: "Anime" },
  episodes: { type: Number },
  score: { type: Number },
  status: { type: String },
  time: { type: Number },
});

module.exports = mongoose.model("AnimeEntry", AnimeEntrySchema);
