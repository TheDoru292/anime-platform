const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadReplySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    commentedOn: { type: Date, required: true },
    reply: this
});

module.exports = mongoose.model("Thread", ThreadSchema);
