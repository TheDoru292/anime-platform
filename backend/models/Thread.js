const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    name: { type: String, required: true },
    author: { type: Schema.Types.Object, ref: "User" },
    createdOn: { type: Date, required: true },
    episodeThread: { type: Boolean, required: true },
    episode: { type: Schema.Types.Object, ref: "Episode" },
    chapterThread: { type: Boolean, required: true },
    chapter: { type: Schema.Types.Object, ref: "Chapter" },
    pollThread: { type: Boolean, required: true },
    poll: { type: Schema.Types.Object, ref: "Poll" },
});

module.exports = mongoose.model("Thread", ThreadSchema);
