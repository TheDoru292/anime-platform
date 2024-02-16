const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecommendationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: { type: String, required: true },
    manga: {
        type: Schema.Types.ObjectId,
        ref: "Manga",
    },
    recommendedManga: {
        type: Schema.Types.ObjectId,
        ref: "Manga",
    },
    anime: {
        type: Schema.Types.ObjectId,
        ref: "Anime",
    },
    recommendedAnime: {
        type: Schema.Types.ObjectId,
        ref: "Manga",
    }
})

module.exports = mongoose.model("Recommendation", RecommendationSchema);
