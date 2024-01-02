const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: Object },
  japaneseName: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Character", CharacterSchema);
