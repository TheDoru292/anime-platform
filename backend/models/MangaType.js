const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MangaTypeSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("MangaType", MangaTypeSchema);
