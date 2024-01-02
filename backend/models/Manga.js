const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MangaSchema = new Schema({
  title: { type: String, required: true },
  cover: { type: String },
  type: { type: Schema.Types.ObjectId, ref: "MangaType" },
  genres: [{ type: Schema.Types.ObjectId, ref: "MangaGenre" }],
  themes: [{ type: Schema.Types.ObjectId, ref: "MangaTheme" }],
  status: { type: String, required: true },
  synopsys: { type: String },
  serialization: { type: String },
  volumes: { type: Number },
  chapters: { type: Number },
  alternativeTitles: { type: Object },
  publishedDate: { type: Object },
  relations: { type: Object },
});

module.exports = mongoose.model("Manga", MangaSchema);
