const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimeSourceSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("AnimeSource", AnimeSourceSchema);
