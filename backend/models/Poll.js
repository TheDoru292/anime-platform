const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    title: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    thread: {
        type: Schema.Types.ObjectId,
        ref: 'Thread',
        required: true
    },
    options: [{ type: String }],
    startDate: {
        type: String,
        required: true,
        default: new Date()
    },
    endingDate: { type: Date, required: true },
});

module.exports = mongoose.model("Poll", PollSchema);
