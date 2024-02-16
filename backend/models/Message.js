const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    message: { type: String, required: true },
    sentAt: { type: Date, required: true, default: new Date() },
    reply: this,
});

module.exports = mongoose.model("Message", MessageSchema);
