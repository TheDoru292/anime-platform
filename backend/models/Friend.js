const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
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
    friendsSince: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Friend", FriendSchema)
