const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimeThemeSource = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("AnimeTheme", AnimeThemeSource);
