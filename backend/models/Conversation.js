const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    firstUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    secondUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Conversation", ConversationSchema);
