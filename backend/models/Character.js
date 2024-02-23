const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  romanizedName: { type: String },
  originalName: { type: String },
  description: { type: String },
  relations: [
    {
      anime: {
        type: Schema.Types.ObjectId,
        ref: 'Anime',
      },
      manga: {
        type: Schema.Types.ObjectId,
        ref: 'Manga',
      },
      role: {
        type: String,
        required: true
      }
    }
  ],
  voiceActors: [{ type: Schema.Types.ObjectId, ref: 'People' }],
});

module.exports = mongoose.model("Character", CharacterSchema);
