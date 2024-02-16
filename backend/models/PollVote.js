const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollVoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    poll: {
        type: Schema.Types.ObjectId,
        ref: 'Poll',
        required: true
    },
    choice: { type: Number, required: true }
});

module.exports = mongoose.model("Poll", PollSchema);
