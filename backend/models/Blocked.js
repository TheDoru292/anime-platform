const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlockedSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    blockedUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    blockedSince: { type: Date, required: true, default: new Date() },
})

module.exports = mongoose.model("Blocked", BlockedSchema);
