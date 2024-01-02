const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MangaThemeSource = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("MangaTheme", MangaThemeSource);
