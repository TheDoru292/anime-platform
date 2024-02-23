const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
    anime: { type: Schema.Types.ObjectId, ref: 'Anime', required: true },
    engTitle: { type: String },
    originalTitle: { type: String },
    episodeNumber: { type: Number },
    thread: { type: Schema.Types.ObjectId, ref: 'Thread' },
});

module.exports = mongoose.model("Episode", EpisodeSchema);
