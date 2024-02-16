const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Rough notification model, to be thought more throughly later.
const NotificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    notification: { type: String },
    seen: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true, default: new Date() },
})

module.exports = mongoose.model("Notification", NotificationSchema);
