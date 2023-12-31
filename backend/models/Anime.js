const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimeSchema = new Schema({
  title: { type: String, required: true },
  cover: { type: String },
  type: { type: Schema.Types.ObjectId, ref: "AnimeType" },
  genres: [{ type: Schema.Types.ObjectId, ref: "AnimeGenre" }],
  themes: [{ type: Schema.Types.ObjectId, ref: "AnimeTheme" }],
  status: { type: String, required: true },
  broadcast: { type: String },
  source: { type: String },
  synopsys: { type: String },
  episodes: { type: Number },
  duration: { type: Number },
  ratings: { type: String },
  alternativeTitles: { type: Object },
  airDate: { type: Object },
  relations: { type: Object },
});

module.exports = mongoose.model("Anime", AnimeSchema);
