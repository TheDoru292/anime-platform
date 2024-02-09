const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
    manga: { type: Schema.Types.ObjectId, ref: 'Manga', required: true },
    engTitle: { type: String },
    originalTitle: { type: String },
    chapterNumber: { type: Number },
    thread: { type: Schema.Types.ObjectId, ref: 'Thread' },
});

module.exports = mongoose.model("Chapter", ChapterSchema);
