const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimeTypeSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("AnimeType", AnimeTypeSchema);
