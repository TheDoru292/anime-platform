const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MangaEntrySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  manga: { type: Schema.Types.ObjectId, ref: "Manga" },
  chapters: { type: Number },
  volumes: { type: Number },
  score: { type: Number },
  status: { type: String },
  time: { type: Number },
});

module.exports = mongoose.model("MangaEntry", MangaEntrySchema);
