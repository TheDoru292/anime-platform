const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendReqSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model("FriendReq", FriendReqSchema);
