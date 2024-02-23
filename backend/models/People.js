const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeopleSchema = new Schema({
    romanizedName: { type: String },
    givenName: { type: String },
    familyName: { type: String },
    image: { type: String },
    birthday: { type: Date },
    website: { type: String },
    voiceActingRoles: [
        {
            anime: {
                type: Schema.Types.ObjectId,
                ref: "Anime",
            },
            character: {
                type: Schema.Types.ObjectId,
                ref: "Character",
            },
            date: { type: Date }
        }
    ],
    animePositions: [
        {
            anime: {
                type: Schema.Types.ObjectId,
                ref: "Anime"
            },
            position: { type: String },
            date: { type: Date }
        }
    ],
    publishedManga: [
        {
            manga: {
                type: Schema.Types.ObjectId,
                ref: "Manga"
            },
            position: { type: String },
            date: { type: Date }
        }
    ],
});

module.exports = mongoose.model("People", PeopleSchema);
